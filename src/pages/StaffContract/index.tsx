import { useMutation } from "@tanstack/react-query";
import { onHandleErrorAPIResponse } from "../../utils/helper";
import ContractAPI from "../../api/Contract";
import { ChangeEvent, useEffect, useState } from "react";
import { ContractItemTypes } from "../../api/Contract/type";
import { Avatar, Button, Card, Col, Flex, Input, Row, Select, Skeleton, Tag, message } from "antd";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { debounce } from "lodash";
import { ContractStatusEnum } from "../../enums";
import "./style.css";
import dayjs from "dayjs";

const StaffContract = () => {
  const [contracts, setContracts] = useState<ContractItemTypes[]>([]);
  const userProfileState = useSelector((selector: RootState) => selector.userProfile.profile);

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
      setContracts(res.data);
    },
  });

  const { isPending: isPendingUpdateContract, mutate: updateContractStatus } = useMutation({
    mutationFn: ContractAPI.updateContract,
    mutationKey: [""],
    onError: (error) => {
      onHandleErrorAPIResponse(error);
    },
    onSuccess: () => {
      message.success("Cập nhật trạng thái hợp đồng thành công"),
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
      const result = contractsResponse.data.filter((item: ContractItemTypes) => item.title.toLowerCase().includes(value));
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

  const onUpdateContractStatus = (contract: ContractItemTypes, status: ContractStatusEnum) => {
    updateContractStatus({
      id: contract.id,
      staffId: userProfileState.id,
      contractDetails: [],
      description: contract.status,
      devicePackages: [],
      status,
      title: contract.title,
    });
  };

  if (isLoadingContractList || isPendingUpdateContract) {
    return <Skeleton />;
  }

  return (
    <Flex vertical gap="middle">
      <Flex gap={5} align="center">
        <Input.Search placeholder="Tìm tên hợp đồng" onChange={debounce(onSearchSurveyName, 500)} />
        <Select
          placeholder="Trạng thái"
          onChange={(event) => onFilterContractStatus(event)}
          options={[
            {
              label: "All",
              value: "",
            },
            {
              label: "Pending Deposit",
              value: ContractStatusEnum.PENDiNG_DEPOSIT,
            },
            {
              label: "Deposit Paid",
              value: ContractStatusEnum.DEPOSIT_PAID,
            },
            {
              label: "Inprogress",
              value: ContractStatusEnum.IN_PROGRESS,
            },
            {
              label: "Wait For Paid",
              value: ContractStatusEnum.WAIT_FOR_PAID,
            },
            {
              label: "Completed",
              value: ContractStatusEnum.COMPLETED,
            },
            {
              label: "Cancelled",
              value: ContractStatusEnum.CANCELLED,
            },
          ]}
        />
      </Flex>

      <Flex vertical gap="middle">
        {contracts.map((contractItem) => {
          return (
            <Card key={contractItem.id} size="small">
              <Flex vertical gap={"middle"}>
                <Flex justify="space-between" align="center">
                  <div className="contract-tag">CONTRACT</div>
                  <Flex align="center" gap={5}>
                    <div className="contract-tag" style={{ color: "#414141" }}>
                      {dayjs(contractItem.startPlanDate).format("MM/DD/YYYY")}
                    </div>
                    -
                    <div className="contract-tag" style={{ color: "#414141" }}>
                      {dayjs(contractItem.endPlanDate).format("MM/DD/YYYY")}
                    </div>
                  </Flex>
                </Flex>

                <Flex align="center" gap="middle" justify="space-between">
                  <div className="contract-name">{contractItem.title}</div>
                  <Tag color={onGetContractStatus(contractItem.status as ContractStatusEnum)}>{contractItem.status}</Tag>
                </Flex>

                <div className="contract-tag">{contractItem.description}</div>

                <Flex align="center" justify="space-between">
                  <Flex align="center" gap={4}>
                    <Avatar
                      size="small"
                      src="https://images.unsplash.com/photo-1712876718842-5b7d59ad453b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8"
                    ></Avatar>
                    <div className="staff-name">{contractItem.customer.fullName}</div>
                  </Flex>

                  <Flex align="center" gap={4}>
                    <Avatar
                      size="small"
                      src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y3VzdG9tZXJ8ZW58MHx8MHx8fDA%3D"
                    ></Avatar>
                    <div className="staff-name">{contractItem.teller.fullName}</div>
                  </Flex>
                </Flex>

                <Row gutter={[14, 14]}>
                  <Col span={24}>
                    <Select
                      defaultValue={contractItem.status}
                      style={{ width: "100%" }}
                      onChange={(event) => onUpdateContractStatus(contractItem, event as ContractStatusEnum)}
                      placeholder="Trạng thái"
                      options={[
                        {
                          label: "All",
                          value: "",
                        },
                        {
                          label: "Pending Deposit",
                          value: ContractStatusEnum.PENDiNG_DEPOSIT,
                        },
                        {
                          label: "Deposit Paid",
                          value: ContractStatusEnum.DEPOSIT_PAID,
                        },
                        {
                          label: "Inprogress",
                          value: ContractStatusEnum.IN_PROGRESS,
                        },
                        {
                          label: "Wait For Paid",
                          value: ContractStatusEnum.WAIT_FOR_PAID,
                        },
                        {
                          label: "Completed",
                          value: ContractStatusEnum.COMPLETED,
                        },
                        {
                          label: "Cancelled",
                          value: ContractStatusEnum.CANCELLED,
                        },
                      ]}
                    />
                  </Col>

                  <Col span={12}>
                    <Button size="small" block>
                      Hình hợp đồng
                    </Button>
                  </Col>
                  <Col span={12}>
                    <Button size="small" block>
                      Hình nghiệm thu
                    </Button>
                  </Col>
                </Row>
              </Flex>
            </Card>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default StaffContract;
