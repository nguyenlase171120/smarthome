import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import SurveyRequestAPI from "../../api/Survey";
import {
  Button,
  Card,
  Descriptions,
  Flex,
  Input,
  Skeleton,
  Tag,
  message,
} from "antd";
import {
  onHandleErrorAPIResponse,
  onLoadSurveyStatus,
} from "../../utils/helper";
import { SurveyItemTypes } from "../../types/Survey";
import dayjs from "dayjs";
import { DateTimeFormat } from "../../enums";

const Surveys = () => {
  const {
    isPending: isPendingSurveyList,
    mutate: getSurveyList,
    data: surveyList,
  } = useMutation({
    mutationFn: SurveyRequestAPI.GetSurveyList,
    onError: (error) => {
      onHandleErrorAPIResponse(error);
    },
    onSuccess: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    getSurveyList({
      customerId: "ba192f6f-e0fb-46f4-b427-4cb324f6538c",
    });
  }, []);

  if (isPendingSurveyList) {
    return <Skeleton />;
  }

  return (
    <Flex vertical gap="middle">
      {surveyList?.data.map((survey: SurveyItemTypes) => {
        return (
          <Card size="small" key={survey.id}>
            <Descriptions
              items={[
                {
                  key: "1",
                  label: "Ngày tạo",
                  children: dayjs(survey.createAt).format(
                    DateTimeFormat.FULL_DATE_TIME_FORMAT
                  ),
                },
                {
                  key: "desc",
                  label: "Mô tả",
                  children: (
                    <Input.TextArea rows={3} value={survey.description} />
                  ),
                },
                {
                  key: "status",
                  label: "Trạng thái",
                  children: onLoadSurveyStatus(survey.status),
                },
              ]}
            />
          </Card>
        );
      })}
    </Flex>
  );
};

export default Surveys;
