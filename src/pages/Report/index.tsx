import { useMutation } from "@tanstack/react-query";
import {
  Avatar,
  Button,
  Card,
  Flex,
  Input,
  Select,
  Skeleton,
  Spin,
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
import {
  convertSurveyStatusToVN,
  onHandleErrorAPIResponse,
} from "../../utils/helper";

const SurveyReports = () => {
  const [surveyReportUpdate, setSurveyReportUpdate] = useState<any>();
  const [surveyReports, setSurveyReports] = useState<any[]>([]);
  const [surveyFilter, setSurveyFilter] = useState<QuerySurveyReportParams>({
    appointmentDate: "",
    pageNumber: 0,
    pageSize: 999,
    status: SurveyStatusEnum.ALL,
  });
  const {
    isLoading: isLoadingSurveyList,
    mutate: getSurveyReports,
    data: surveyReportsList,
  } = useMutation({
    mutationFn: SurveyReportAPI.GetAllSurvey,
    mutationKey: ["survey-report"],
    onError: (errorResponse) => {
      onHandleErrorAPIResponse(errorResponse);
    },
    onSuccess: (res) => {
      setSurveyReports(res.data);
    },
  });

  useEffect(() => {
    getSurveyReports(surveyFilter as QuerySurveyReportParams);
  }, [surveyFilter]);

  if (isLoadingSurveyList) {
    return (
      <Flex align="center" justify="center" style={{ minHeight: "50vh" }}>
        <Spin />
      </Flex>
    );
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

  const onUpdateSurveyReport = (data: any) => {
    setSurveyReportUpdate(data);
  };

  return (
    <Flex vertical gap="middle">
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
              label: convertSurveyStatusToVN(SurveyStatusEnum.ALL),
              value: "",
            },
            {
              label: convertSurveyStatusToVN(SurveyStatusEnum.COMPLETED),
              value: SurveyStatusEnum.COMPLETED,
            },
            {
              label: convertSurveyStatusToVN(SurveyStatusEnum.PENDING),
              value: SurveyStatusEnum.PENDING,
            },
            {
              label: convertSurveyStatusToVN(SurveyStatusEnum.INPROGESS),
              value: SurveyStatusEnum.INPROGESS,
            },
            {
              label: convertSurveyStatusToVN(SurveyStatusEnum.REJECTED),
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
                      {item.recommendDevicePackage?.name}
                    </div>

                    {item.status === SurveyStatusEnum.INPROGESS && (
                      <Button
                        icon={<EditOutlined />}
                        type="text"
                        onClick={() => onUpdateSurveyReport(item)}
                      />
                    )}
                  </Flex>

                  <Flex justify="space-between" align="center" gap="middle">
                    <div className="customer-name">
                      {item.surveyRequest.customer.fullName}
                    </div>

                    <Tag color={onGetStatusColor(item.status)}>
                      {convertSurveyStatusToVN(item.status)}
                    </Tag>
                  </Flex>
                  <div className="customer-name">
                    {dayjs(item.appointmentDate).format("MM/DD/YYYY HH:mm")}
                  </div>
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
