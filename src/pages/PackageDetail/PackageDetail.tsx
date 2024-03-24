import { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./PackageDetail.css";
import CommentCard from "../../components/Card/CommentCard";
import { useMutation } from "@tanstack/react-query";
import DevicePackagesAPI from "../../api/DevicePackage";
import { onHandleErrorAPIResponse } from "../../utils/helper";
import { Skeleton } from "antd";
import ComboCard from "../../components/Card/PackageCard";
import { DevicePackageDetailTypes } from "../../api/DevicePackage/type";

const PackageDetail: React.FC = () => {
  const { id }: any = useParams();
  const [packageData, setPackage] = useState<DevicePackageDetailTypes>();

  const {
    isPending: isDeviceByPackageIdLoading,
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

  const lstComment = [
    {
      key: 1,
      avatar:
        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
      name: "User 1",
      content: "Review 1",
    },
    {
      key: 2,
      avatar:
        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
      name: "User 2",
      content: "Review 2",
    },
    {
      key: 3,
      avatar:
        "https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png",
      name: "User 3",
      content: "Review 3",
    },
  ];

  useEffect(() => {
    if (id) {
      getDevicesByPackageId(id);
    }
  }, [id]);

  if (isDeviceByPackageIdLoading) {
    return <Skeleton active />;
  }

  return (
    <div className="container-main content-wrapper detail-package-wrapper">
      {packageData && (
        <ComboCard smartDevices={packageData!.smartDevicePackages} />
      )}

      <h5>Nhận Xét</h5>
      {lstComment.map((comment: any) => (
        <CommentCard key={comment.key} item={comment} />
      ))}
      <div className="group__button">
        <button className="btn-chat">Chat</button>
        <button className="btn-send">Gửi yêu cầu khảo sát</button>
      </div>
    </div>
  );
};

export default PackageDetail;
