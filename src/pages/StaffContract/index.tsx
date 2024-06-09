import { useMutation } from "@tanstack/react-query";
import {
  convertStatusToVN,
  onHandleErrorAPIResponse,
} from "../../utils/helper";
import ContractAPI from "../../api/Contract";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import {
  ContractItemTypes,
  UpdateContractTypes,
} from "../../api/Contract/type";
import {
  Avatar,
  Card,
  Col,
  Flex,
  Input,
  Row,
  Select,
  Spin,
  Tag,
  message,
} from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { debounce } from "lodash";
import { ContractStatusEnum } from "../../enums";
import "./style.css";
import dayjs from "dayjs";
import { UploadOutlined } from "@ant-design/icons";
import ContractRequirementDialog from "./ContractRequirementDialog";

const StaffContract = () => {
  const [contracts, setContracts] = useState<ContractItemTypes[]>([]);
  const userProfileState = useSelector(
    (selector: RootState) => selector.userProfile.profile
  );
  const contractRequirementRef = useRef<any>();

  const [contractId, setContractId] = useState<string>("");
  const [fileAcceptance, setFileAcceptance] = useState<File>();

  const { isPending: isLoadingUploadImage, mutate: mutateUploadContractImage } =
    useMutation({
      mutationFn: ContractAPI.uploadContractImage,
      mutationKey: ["contract-image"],
      onError: (errorResponse) => {
        onHandleErrorAPIResponse(errorResponse);
      },
      onSuccess: () => {
        message.success("Tải hình ảnh hợp đồng thành công");
        getContractDetailMutate(contractId);
      },
    });

  const {
    isPending: isLoadingUploadAcceptance,
    mutate: mutateUploadAcceptanceImage,
  } = useMutation({
    mutationFn: ContractAPI.uploadContractAcceptance,
    mutationKey: ["contract-image"],
    onError: (errorResponse) => {
      onHandleErrorAPIResponse(errorResponse);
    },
    onSuccess: () => {
      message.success("Tải hình ảnh nghiệm thu thành công");
      mutateContracts({
        staffId: userProfileState.id,
        pageSize: 1000,
      });
    },
  });

  const {
    mutate: getContractDetailMutate,
    isPending: isLoadingContractDetail,
  } = useMutation({
    onSuccess: (result) => {
      const response: ContractItemTypes = result;

      const convertContractDetails = response.contractDetails.map(
        (contract) => {
          return {
            smartDeviceId: contract.smartDeviceId,
            quantity: contract.quantity,
          };
        }
      );
      const convertDevicePackages = response.devicePackageUsages.map(
        (item) => item.devicePackageId
      );

      onUpdateContractStatus(
        {
          contractDetails: convertContractDetails,
          description: response.description,
          devicePackages: convertDevicePackages,
          id: response.id,
          staffId: response.staff.accountId,
          status: response.status,
          title: response.title,
        },
        response.status === ContractStatusEnum.DEPOSIT_PAID
          ? ContractStatusEnum.IN_PROGRESS
          : ContractStatusEnum.WAIT_FOR_PAID
      );
    },
    mutationFn: ContractAPI.getContractDetail,
    mutationKey: [""],
    onError: (error) => onHandleErrorAPIResponse(error),
  });

  const {
    isPending: isLoadingContractList,
    data: contractsResponse,
    mutate: mutateContracts,
  } = useMutation({
    mutationFn: ContractAPI.getAllContracts,
    onError: (error) => {
      onHandleErrorAPIResponse(error);
    },
    onSuccess: (res) => {
      const result = res.data.filter(
        (contract: ContractItemTypes) =>
          contract.status !== ContractStatusEnum.CANCELLED
      );
      setContracts(result);
    },
  });

  const { isPending: isLoadingUpdateContract, mutate: updateContractStatus } =
    useMutation({
      mutationFn: ContractAPI.updateContract,
      mutationKey: [""],

      onSuccess: (res) => {
        const response: ContractItemTypes = res;

        message.success("Cập nhật trạng thái hợp đồng thành công");

        if (response.status === ContractStatusEnum.WAIT_FOR_PAID) {
          const formData = new FormData();
          formData.append("image", fileAcceptance as Blob);
          return mutateUploadAcceptanceImage({
            formData,
            id: contractId,
          });
        }

        mutateContracts({
          staffId: userProfileState.id,
          pageSize: 1000,
        });
      },
    });

  useEffect(() => {
    mutateContracts({
      staffId: userProfileState.id,
      pageSize: 1000,
    });
  }, []);

  const onSearchSurveyName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();

    if (contractsResponse) {
      const result = contractsResponse.data.filter((item: ContractItemTypes) =>
        item.title.toLowerCase().includes(value)
      );
      setContracts(result);
    }
  };

  const onFilterContractStatus = (status: ContractStatusEnum) => {
    mutateContracts({
      staffId: userProfileState.id,
      pageSize: 1000,
      status,
    });
  };

  const onGetContractStatus = (status: ContractStatusEnum) => {
    switch (status) {
      case ContractStatusEnum.CANCELLED: {
        return "error";
      }

      default: {
        return "blue";
      }
    }
  };

  const onUpdateContractStatus = (
    contract: UpdateContractTypes,
    status: ContractStatusEnum
  ) => {
    updateContractStatus({
      id: contract.id,
      staffId: userProfileState.id,
      contractDetails: contract.contractDetails,
      description: contract.status,
      devicePackages: contract.devicePackages,
      status,
      title: contract.title,
    });
  };

  const onUploadImageContract = (
    e: ChangeEvent<HTMLInputElement>,
    contractId: string
  ) => {
    setContractId(contractId);
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      const formData = new FormData();
      formData.append("image", selectedImage);
      mutateUploadContractImage({
        formData,
        id: contractId,
      });
    }
  };

  const onUploadAcceptanceContract = (
    e: ChangeEvent<HTMLInputElement>,
    contractId: string
  ) => {
    setContractId(contractId);
    if (e.target.files && e.target.files.length > 0) {
      const selectedImage = e.target.files[0];
      setFileAcceptance(selectedImage);

      getContractDetailMutate(contractId, {
        onSuccess: (result) => {
          const response: ContractItemTypes = result;

          const convertContractDetails = response.contractDetails.map(
            (contract) => {
              return {
                smartDeviceId: contract.smartDeviceId,
                quantity: contract.quantity,
              };
            }
          );
          const convertDevicePackages = response.devicePackageUsages.map(
            (item) => item.devicePackageId
          );

          onUpdateContractStatus(
            {
              contractDetails: convertContractDetails,
              description: response.description,
              devicePackages: convertDevicePackages,
              id: response.id,
              staffId: response.staff.accountId,
              status: response.status,
              title: response.title,
            },
            response.status === ContractStatusEnum.DEPOSIT_PAID
              ? ContractStatusEnum.IN_PROGRESS
              : ContractStatusEnum.WAIT_FOR_PAID
          );
        },
      });
    }
  };

  return (
    <Flex vertical gap="middle">
      <ContractRequirementDialog ref={contractRequirementRef} />

      <Spin
        spinning={
          isLoadingContractList ||
          isLoadingUpdateContract ||
          isLoadingUploadImage ||
          isLoadingUploadAcceptance ||
          isLoadingContractDetail
        }
      >
        <Flex gap={5} align="center">
          <Input.Search
            placeholder="Tìm tên hợp đồng"
            onChange={debounce(onSearchSurveyName, 500)}
          />
          <Select
            placeholder="Trạng thái"
            onChange={(event) => onFilterContractStatus(event)}
            options={[
              {
                label: convertStatusToVN(ContractStatusEnum.ALL),
                value: "",
              },
              {
                label: convertStatusToVN(ContractStatusEnum.PENDiNG_DEPOSIT),
                value: ContractStatusEnum.PENDiNG_DEPOSIT,
              },
              {
                label: convertStatusToVN(ContractStatusEnum.DEPOSIT_PAID),
                value: ContractStatusEnum.DEPOSIT_PAID,
              },
              {
                label: convertStatusToVN(ContractStatusEnum.IN_PROGRESS),
                value: ContractStatusEnum.IN_PROGRESS,
              },
              {
                label: convertStatusToVN(ContractStatusEnum.WAIT_FOR_PAID),
                value: ContractStatusEnum.WAIT_FOR_PAID,
              },
              {
                label: convertStatusToVN(ContractStatusEnum.COMPLETED),
                value: ContractStatusEnum.COMPLETED,
              },
              {
                label: convertStatusToVN(ContractStatusEnum.CANCELLED),
                value: ContractStatusEnum.CANCELLED,
              },
            ]}
          />
        </Flex>

        <Flex vertical gap="middle" style={{ marginTop: "1rem" }}>
          {contracts.map((contractItem) => {
            return (
              <Card
                key={contractItem.id}
                size="small"
                style={{
                  border: "1px solid #000",
                  borderRadius: "1rem",
                }}
              >
                <Flex vertical gap={"middle"}>
                  <Flex justify="space-between" align="center">
                    <div className="contract-tag">Hợp đồng</div>
                    <Flex align="center" gap={5}>
                      <div
                        className="contract-tag"
                        style={{ color: "#414141" }}
                      >
                        {dayjs(contractItem.startPlanDate).format("MM/DD/YYYY")}
                      </div>
                      -
                      <div
                        className="contract-tag"
                        style={{ color: "#414141" }}
                      >
                        {dayjs(contractItem.endPlanDate).format("MM/DD/YYYY")}
                      </div>
                    </Flex>
                  </Flex>

                  <Flex align="center" gap="middle" justify="space-between">
                    <div className="contract-name">{contractItem.title}</div>
                    <Tag
                      color={onGetContractStatus(
                        contractItem.status as ContractStatusEnum
                      )}
                    >
                      {convertStatusToVN(
                        contractItem.status as ContractStatusEnum
                      )}
                    </Tag>
                  </Flex>

                  <div className="contract-tag">{contractItem.description}</div>

                  <Flex align="center" justify="space-between">
                    <Flex align="center" gap={4}>
                      <Avatar
                        size="small"
                        src="https://images.unsplash.com/photo-1712876718842-5b7d59ad453b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                      ></Avatar>
                      <div className="staff-name">
                        {contractItem.customer.fullName}
                      </div>
                    </Flex>

                    <Flex align="center" gap={4}>
                      <Avatar
                        size="small"
                        src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3VzdG9tZXJ8ZW58MHx8MHx8fDA%3D"
                      ></Avatar>
                      <div className="staff-name">
                        {contractItem.teller.fullName}
                      </div>
                    </Flex>
                  </Flex>

                  <Row gutter={[14, 14]}>
                    <Col span={12}>
                      <label
                        htmlFor={`file-upload-${contractItem.id}`}
                        className="upload-btn"
                        style={{
                          opacity:
                            contractItem.status !==
                            ContractStatusEnum.DEPOSIT_PAID
                              ? 0.5
                              : 1,
                        }}
                      >
                        <UploadOutlined />
                        Hình hợp đồng
                      </label>

                      <input
                        disabled={
                          contractItem.status !==
                          ContractStatusEnum.DEPOSIT_PAID
                        }
                        style={{ display: "none" }}
                        id={`file-upload-${contractItem.id}`}
                        type="file"
                        accept="images/*"
                        onChange={(event) =>
                          onUploadImageContract(event, contractItem.id)
                        }
                      />
                    </Col>
                    <Col span={12}>
                      <label
                        htmlFor={`file-acceptance-upload-${contractItem.id}`}
                        className="upload-btn"
                        style={{
                          opacity:
                            contractItem.status !==
                            ContractStatusEnum.IN_PROGRESS
                              ? 0.5
                              : 1,
                        }}
                      >
                        <UploadOutlined />
                        Hình nghiệm thu
                      </label>
                      <input
                        disabled={
                          contractItem.status !== ContractStatusEnum.IN_PROGRESS
                        }
                        style={{ display: "none" }}
                        id={`file-acceptance-upload-${contractItem.id}`}
                        type="file"
                        accept="images/*"
                        onChange={(event) =>
                          onUploadAcceptanceContract(event, contractItem.id)
                        }
                      />
                    </Col>
                  </Row>
                </Flex>
              </Card>
            );
          })}
        </Flex>
      </Spin>
    </Flex>
  );
};

export default StaffContract;
