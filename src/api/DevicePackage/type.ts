import {
  ImageItemTypes,
  ManufactureItemTypes,
  PromotionItemTypes,
  SmartDeviceItemTypes,
} from "../../types";

export type DevicePackageTypes = {
  id: string;
  name: string;
  warrantyDuration: number;
  completionTime: number;
  description: string;
  price: number;
  status: string;
  createAt: string;
  manufacturer: ManufactureItemTypes;
  promotion: PromotionItemTypes;
  images: ImageItemTypes[];
};

export type DevicePackageDetailTypes = {
  smartDevicePackages: SmartDevicePackageItemTypes[];
} & DevicePackageTypes;

export type SmartDevicePackageItemTypes = {
  smartDeviceQuantity: number;
  smartDevice: SmartDeviceItemTypes;
};
