import { useMutation } from "@tanstack/react-query";
import { Button, DatePicker, Form, Input, Modal, message } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";
import SurveyRequestAPI from "../../api/Survey";
import { onHandleErrorAPIResponse } from "../../utils/helper";
import dayjs from "dayjs";
import { DateTimeFormat } from "../../enums";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const SurveyModal = ({}, ref: any) => {
  const userProfileState = useSelector(
    (selector: RootState) => selector.userProfile.profile
  );
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = Form.useForm();
  const { isLoading: isLoadingCreateNewSurvey, mutate: createNewSurvey } =
    useMutation({
      mutationFn: SurveyRequestAPI.CreateNewSurvey,
      onError: (error) => {
        onHandleErrorAPIResponse(error);
      },
      onSuccess: () => {
        message.success("Gửi yêu cầu thành công");
        onCloseModal();
      },
    });

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => {
    setIsOpenModal(false);
  };

  const onSubmit = (value: { description: string; surveyDate: string }) => {
    createNewSurvey({
      customerId: userProfileState.id,
      description: value.description,
      surveyDate: dayjs(value.surveyDate).format(DateTimeFormat.DATE_FORMAT),
    });
  };

  return (
    <Modal
      open={isOpenModal}
      title="Yêu cầu khảo sát"
      onCancel={onCloseModal}
      closeIcon
      footer
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={onSubmit}
        requiredMark={false}
      >
        <Form.Item
          name="surveyDate"
          rules={[
            { required: true, message: "Ngày gửi yêu cầu không được trống" },
          ]}
        >
          <DatePicker
            style={{ width: "100%" }}
            placeholder="Ngày muốn khảo sát"
            disabledDate={(current) => {
              let customDate = dayjs().format("YYYY-MM-DD");
              return current && current < dayjs(customDate, "YYYY-MM-DD");
            }}
          />
        </Form.Item>
        <Form.Item name="description" label="Ghi chú">
          <Input.TextArea rows={3} placeholder="Mô tả" />
        </Form.Item>

        <Button
          type="primary"
          style={{ width: "100%" }}
          htmlType="submit"
          loading={isLoadingCreateNewSurvey}
        >
          Gửi yêu cầu
        </Button>
      </Form>
    </Modal>
  );
};

export default forwardRef(SurveyModal);
