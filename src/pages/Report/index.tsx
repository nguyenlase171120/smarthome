import { useMutation } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Card,
  Flex,
  Input,
  Select,
  Skeleton,
  Tag,
  Typography,
  message,
} from "antd";
import SurveyReportAPI from "../../api/SurveyReport";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./style.css";
import { EditOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { SurveyStatusEnum } from "../../enums";
import CreateSurveyReport from "./CreateSurveyReport";
import { QuerySurveyReportParams } from "../../types/SurveyReport";
import { debounce } from "lodash";

const SurveyReports = () => {
  const createSurveyReportRef = useRef<any>();
  const [surveyReports, setSurveyReports] = useState<any[]>([]);
  const [surveyReportUpdate, setSurveyReportUpdate] = useState<any>();

  const [surveyFilter, setSurveyFilter] = useState<QuerySurveyReportParams>({
    appointmentDate: "",
    pageNumber: 1,
    pageSize: 10,
    status: SurveyStatusEnum.ALL,
  });

  const {
    isPending: isPendingSurveyList,
    mutate: getSurveyReports,
    data: surveyReportsList,
  } = useMutation({
    mutationFn: SurveyReportAPI.GetAllSurvey,
    mutationKey: ["survey-report"],
    onError: (errorResponse) => {
      message.error(errorResponse.message);
    },
    onSuccess: (res) => {
      setSurveyReports(res.data);
    },
  });

  useEffect(() => {
    getSurveyReports(surveyFilter as QuerySurveyReportParams);
  }, [surveyFilter]);

  if (isPendingSurveyList) {
    return <Skeleton />;
  }

  const onGetStatusColor = (status: string) => {
    switch (status) {
      case SurveyStatusEnum.COMPLETED: {
        return "green";
      }

      case SurveyStatusEnum.INPROGESS: {
        return "blue";
      }

      case SurveyStatusEnum.PENDING: {
        return "yellow";
      }

      case SurveyStatusEnum.REJECTED: {
        return "red";
      }
    }
  };

  const onOpenSurveyReport = (valueUpdate: any) => {
    setSurveyReportUpdate(valueUpdate);
    createSurveyReportRef.current.openModal();
  };

  const onFilterSurveyStatus = (status: SurveyStatusEnum) => {
    setSurveyFilter((prevState) => ({
      ...prevState,
      status,
    }));
  };

  const onSearchSurveyName = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.toLowerCase();

    if (surveyReportsList) {
      const result = surveyReportsList.data.filter((item: any) =>
        item.recommendDevicePackage.name.toLowerCase().includes(value)
      );

      setSurveyReports(result);
    }
  };

  return (
    <Flex vertical gap="middle">
      <CreateSurveyReport ref={createSurveyReportRef} />

      <Flex align="center" gap="middle">
        <Input.Search
          placeholder="Tìm tên báo cáo"
          onChange={debounce(onSearchSurveyName, 500)}
        />
        <Select
          placeholder="Trạng thái"
          onChange={(event) => onFilterSurveyStatus(event)}
          options={[
            {
              label: "All",
              value: "",
            },
            {
              label: "Completed",
              value: SurveyStatusEnum.COMPLETED,
            },
            {
              label: "Pending",
              value: SurveyStatusEnum.PENDING,
            },
            {
              label: "Inprogress",
              value: SurveyStatusEnum.INPROGESS,
            },
            {
              label: "Rejected",
              value: SurveyStatusEnum.REJECTED,
            },
          ]}
        />
      </Flex>

      {surveyReports && (
        <Flex vertical gap="middle">
          {surveyReports.map((item: any) => {
            return (
              <Card size="small" key={item.id}>
                <Flex vertical gap={4} flex={1}>
                  <Flex justify="space-between" gap="middle">
                    <div className="survey-title">
                      {item.recommendDevicePackage.name}
                    </div>

                    {item.status === SurveyStatusEnum.INPROGESS && (
                      <Button
                        icon={<EditOutlined />}
                        type="text"
                        onClick={() => onOpenSurveyReport(item)}
                      />
                    )}
                  </Flex>

                  <Flex justify="space-between" align="center" gap="middle">
                    <div className="customer-name">
                      {item.surveyRequest.customer.fullName}
                    </div>

                    <Tag color={onGetStatusColor(item.status)}>
                      {item.status}
                    </Tag>
                  </Flex>
                  <div className="customer-name">
                    {dayjs(item.appointmentDate).format("MM/DD/YYYY HH:mm")}
                  </div>

                  {item.status === SurveyStatusEnum.PENDING && (
                    <Button
                      type="primary"
                      onClick={() => onOpenSurveyReport(item)}
                      block
                      size="small"
                    >
                      Gửi báo cáo
                    </Button>
                  )}
                </Flex>
              </Card>
            );
          })}
        </Flex>
      )}
    </Flex>
  );
};

export default SurveyReports;
