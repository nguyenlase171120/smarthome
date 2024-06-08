import { ContractStatusEnum } from "../../enums";
import {
  CustomerItemTypes,
  StaffItemTypes,
  TellerItemTypes,
} from "../../types";

export type ContractListByCustomerId = {
  staffId?: string;
  customerId?: string;
  pageNumber?: number;
  pageSize?: number;
  status?: ContractStatusEnum;
};

export type ContractItemTypes = {
  id: string;
  title: string;
  description: string;
  startPlanDate: string;
  endPlanDate: string;
  actualStartDate: null;
  actualEndDate: null;
  totalAmount: number;
  imageUrl: string;
  deposit: number;
  status: string;
  createAt: string;
  customer: CustomerItemTypes;
  staff: StaffItemTypes;
  teller: TellerItemTypes;
  devicePackageUsages: DevicePackageUsages[];
  contractDetails: ContractDetailTypes[];
};

export type DevicePackageUsages = {
  devicePackageId: string;
  name: string;
  discountAmount: number;
  price: number;
  manufacturer: string;
  image: string;
  warrantyDuration: number;
  startWarranty: string;
  endWarranty: string;
  createAt: string;
};

export type ContractDetailTypes = {
  smartDeviceId: string;
  name: string;
  type: string;
  price: number;
  quantity: number;
  installationPrice: number;
  manufacturer: string;
  image: string;
  createAt: string;
};

export type UpdateContractTypes = {
  id: string;
  staffId: string;
  title: string;
  description: string;
  status: string;
  devicePackages: string[];
  contractDetails: {
    smartDeviceId: string;
    quantity: number;
  }[];
};

export type CreateContractModifyRequest = {
  contractId: string;
  type: "Modify" | "Cancel";
  description: string;
};
