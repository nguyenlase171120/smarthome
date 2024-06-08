import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import "./PackageDetail.css";
import { useMutation } from "@tanstack/react-query";
import DevicePackagesAPI from "../../api/DevicePackage";
import { onHandleErrorAPIResponse } from "../../utils/helper";
import { Avatar, Button, Flex, List, Skeleton } from "antd";
import ComboCard from "../../components/Card/PackageCard";
import {
  DevicePackageDetailTypes,
  FeedbackItemTypes,
} from "../../api/DevicePackage/type";
import SurveyModal from "./SurveyModal";
import FeedbackModal from "./Feedback";
import { EditOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import StaffList from "./StaffList";

const PackageDetail = () => {
  const { id }: any = useParams();
  const [packageData, setPackage] = useState<DevicePackageDetailTypes>();
  const surveyModalRef = useRef<any>();
  const createFeedbackModalRef = useRef<any>();
  const staffListRef = useRef<any>();

  const [feedbackUpdate, setFeedbackUpdate] = useState<FeedbackItemTypes>();
  const userProfileState = useSelector(
    (selector: RootState) => selector.userProfile.profile
  );

  const {
    isLoading: isDeviceByPackageIdLoading,
    mutate: getDevicesByPackageId,
  } = useMutation({
    mutationFn: DevicePackagesAPI.getDeviceByPackageId,
    onError: (error) => {
      onHandleErrorAPIResponse(error);
    },
    onSuccess: (res: any) => {
      setPackage(res);
    },
  });

  useEffect(() => {
    if (id) {
      getDevicesByPackageId(id);
    }
  }, [id]);

  if (isDeviceByPackageIdLoading) {
    return <Skeleton active />;
  }

  const onCheckCustomerFeedback = () => {
    if (packageData) {
      const isExistCustomer = packageData.feedbackDevicePackages.some(
        (item) => item.customer.accountId === userProfileState.id
      );
      return isExistCustomer;
    }

    return false;
  };

  const onUpdateFeedback = (feedBack: FeedbackItemTypes) => {
    setFeedbackUpdate(feedBack);
    createFeedbackModalRef.current.openModal();
  };

  const onOpenStaffList = () => {
    staffListRef.current.openModal();
  };

  return (
    <div className="container-main content-wrapper detail-package-wrapper">
      <SurveyModal ref={surveyModalRef} />
      <StaffList ref={staffListRef} />

      <FeedbackModal
        ref={createFeedbackModalRef}
        PackageId={packageData?.id as string}
        FeedbackUpdateProp={feedbackUpdate as FeedbackItemTypes}
        HandleAfterCloseModal={() => getDevicesByPackageId(id)}
      />

      {packageData && (
        <ComboCard smartDevices={packageData!.smartDevicePackages} />
      )}

      <Flex align="center" justify="space-between">
        <h5>Nhận Xét</h5>

        {!onCheckCustomerFeedback() && (
          <Button onClick={() => createFeedbackModalRef.current.openModal()}>
            Thêm nhận xét
          </Button>
        )}
      </Flex>

      {packageData && packageData!.feedbackDevicePackages.length > 0 ? (
        <List
          dataSource={packageData?.feedbackDevicePackages}
          pagination={{ position: "bottom", align: "end" }}
          style={{ marginBottom: "1rem" }}
        >
          {packageData?.feedbackDevicePackages.map((feedback, index) => {
            return (
              <List.Item key={feedback.id}>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                    />
                  }
                  title={
                    <a href="https://ant.design">
                      {feedback.customer.fullName}
                    </a>
                  }
                  description={feedback.content}
                />

                {feedback.customer.accountId === userProfileState.id && (
                  <Button
                    icon={<EditOutlined />}
                    type="primary"
                    onClick={() => onUpdateFeedback(feedback)}
                  />
                )}
              </List.Item>
            );
          })}
        </List>
      ) : (
        <Flex
          align="center"
          justify="center"
          style={{ margin: "0.5rem", width: "100%" }}
        >
          <p>Chưa có nhận xét nào</p>
        </Flex>
      )}

      <Flex gap="middle">
        <Button block onClick={onOpenStaffList}>
          Trò chuyện
        </Button>
        <Button
          type="primary"
          block
          onClick={() => surveyModalRef.current.openModal()}
        >
          Gửi yêu cầu khảo sát
        </Button>
      </Flex>
    </div>
  );
};

export default PackageDetail;
