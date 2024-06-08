import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import SurveyRequestAPI from "../../api/Survey";
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  Empty,
  Flex,
  Input,
  List,
  Skeleton,
  Typography,
} from "antd";
import {
  onHandleErrorAPIResponse,
  onLoadSurveyStatus,
} from "../../utils/helper";
import { SurveyItemTypes } from "../../types/Survey";
import dayjs from "dayjs";
import { DateTimeFormat } from "../../enums";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { EyeOutlined, FileTextOutlined } from "@ant-design/icons";
import SurveyDetail from "./SurveyDetail";

const Surveys = () => {
  const userProfileState = useSelector(
    (selector: RootState) => selector.userProfile.profile
  );
  const surveyDetailRef = useRef<any>();

  const [surveySelected, setSurveySelected] = useState<SurveyItemTypes>();

  const {
    isLoading: isLoadingSurveyList,
    mutate: getSurveyList,
    data: surveyList,
  } = useMutation({
    mutationFn: SurveyRequestAPI.GetSurveyList,
    onError: (error) => {
      onHandleErrorAPIResponse(error);
    },
  });

  useEffect(() => {
    getSurveyList({
      customerId: userProfileState.id,
      pageSize: 999,
    });
  }, []);

  if (isLoadingSurveyList) {
    return <Skeleton />;
  }

  if (!surveyList?.data.length) {
    return <Empty />;
  }

  const onOpenSurveyDetail = (value: SurveyItemTypes) => {
    surveyDetailRef.current.openModal();
    setSurveySelected(value);
  };

  return (
    <>
      <SurveyDetail
        ref={surveyDetailRef}
        surveyItem={surveySelected as SurveyItemTypes}
      />

      <List
        pagination={{ position: "bottom", align: "end", pageSize: 10 }}
        dataSource={surveyList.data}
        renderItem={(item: SurveyItemTypes, index) => (
          <List.Item
            key={index}
            actions={[
              <Button
                icon={<EyeOutlined />}
                size="small"
                onClick={() => onOpenSurveyDetail(item)}
              />,
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar shape="square" icon={<FileTextOutlined />} />}
              title={<div> Khảo sát {index + 1} </div>}
              description={
                <Typography.Text> {item.description}</Typography.Text>
              }
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default Surveys;
