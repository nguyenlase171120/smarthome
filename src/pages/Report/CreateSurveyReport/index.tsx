import { Col, Form, Grid, Input, Modal, Row } from "antd";
import { forwardRef, useImperativeHandle, useState } from "react";

const CreateSurveyReportModal = ({}, ref: any) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => {
    return {
      openModal: () => setIsOpenModal(true),
    };
  });

  const onCloseModal = () => {
    setIsOpenModal(false);
  };
  return (
    <Modal
      title="Tạo bảng báo cáo"
      open={isOpenModal}
      onCancel={onCloseModal}
      footer
    >
      <Form layout="vertical" form={form}>
        <Row>
          <Col span={24}>
            <Form.Item
              label="Khu vực phòng"
              name="roomArea"
              rules={[{ required: true, message: "Nhập khu vưc phòng" }]}
            >
              <Input type="number" min={0} />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Mô tả" name="description">
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default forwardRef(CreateSurveyReportModal);
