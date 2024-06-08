import { useMutation } from "@tanstack/react-query";
import {
  Card,
  Descriptions,
  Empty,
  Flex,
  Image,
  Modal,
  Spin,
  Tag,
  message,
} from "antd";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import ContractAPI from "../../api/Contract";
import { ContractItemTypes } from "../../api/Contract/type";
import useConvert from "../../hooks/useConvert";
import { onHandleErrorAPIResponse } from "../../utils/helper";

const ContractDetailDialog = ({}, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const convert = useConvert();

  const {
    mutate: mutateGetContractDetail,
    isLoading: isLoadingGetContractDetail,
    data: contractDetailResponse,
  } = useMutation({
    mutationFn: ContractAPI.getContractDetail,
    onError: (error) => onHandleErrorAPIResponse(error),
  });
  const contractResponse: ContractItemTypes = contractDetailResponse;

  useImperativeHandle(ref, () => {
    return {
      openModal: (contractId: string) => {
        mutateGetContractDetail(contractId);
        setIsOpenModal(true);
      },
    };
  });

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <Modal
      open={isOpenModal}
      title="Chi tiết hợp đồng"
      onCancel={onCloseModal}
      closeIcon
      footer={null}
    >
      <Spin
        spinning={isLoadingGetContractDetail || !contractResponse}
        style={{ margin: "1rem 0" }}
      >
        <Flex align="center" justify="center" vertical gap={10}>
          {contractResponse && contractResponse.devicePackageUsages.length ? (
            contractResponse.devicePackageUsages.map((item, index) => {
              return (
                <Card
                  size="small"
                  style={{
                    border: "1px solid #000",
                    borderRadius: "1rem",
                  }}
                >
                  <Flex vertical gap="middle" key={index}>
                    <Descriptions
                      items={[
                        { label: "Tên gói", children: item.name },
                        {
                          label: "Giá gói",
                          children: (
                            <Tag color="green">
                              {convert.toMoney(item.price)}
                            </Tag>
                          ),
                        },
                        {
                          label: "Hãng",
                          children: item.manufacturer,
                        },
                        {
                          label: "Hình ảnh",
                          children: (
                            <Image
                              src={item.image}
                              alt="image-alt"
                              width="100%"
                            />
                          ),
                        },
                      ]}
                    />
                  </Flex>
                </Card>
              );
            })
          ) : (
            <Empty />
          )}
        </Flex>
      </Spin>
    </Modal>
  );
};

export default forwardRef(ContractDetailDialog);
