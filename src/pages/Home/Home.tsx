import "./Home.css";
import React, { useEffect } from "react";
import PackageCard from "../../components/Card/PackageCard";
import TagCategory from "../../components/Tag/TagCategory";
import { useMutation } from "@tanstack/react-query";
import DevicePackagesAPI from "../../api/DevicePackage";
import { onHandleErrorAPIResponse } from "../../utils/helper";
import { Skeleton } from "antd";
import { DevicePackageTypes } from "../../api/DevicePackage/type";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Home: React.FC = () => {
  const userProfileState = useSelector((selector: RootState) =>
    console.log(selector)
  );

  const {
    isPending: isDevicePackagesLoading,
    mutate: mutateAllDevicePackages,
    data: devicePackages,
  } = useMutation({
    mutationFn: DevicePackagesAPI.getAllDevicePackages,
    onError: (errorResponse) => {
      onHandleErrorAPIResponse(errorResponse);
    },
  });

  useEffect(() => {
    mutateAllDevicePackages();
  }, []);

  if (isDevicePackagesLoading) {
    return <Skeleton active />;
  }

  return (
    <div className="home-wrapper">
      <h5>Welcome back !</h5>
      <div className="category__list">
        {devicePackages?.data.map((item: DevicePackageTypes) => (
          <TagCategory item={item} />
        ))}
      </div>
      {devicePackages?.data.length > 0 && (
        <PackageCard
          lstData={devicePackages?.data}
          key={devicePackages?.data}
        />
      )}
    </div>
  );
};

export default Home;
