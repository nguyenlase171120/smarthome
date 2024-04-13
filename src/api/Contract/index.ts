import { END_POINTS_API } from "../../utils/constant";
import axiosClient from "../axiosClient";
import { ContractListByCustomerId, UpdateContractTypes } from "./type";

const ContractAPI = {
  getAllContracts: (params?: ContractListByCustomerId) =>
    axiosClient.get(END_POINTS_API.CONTRACTS, {
      params,
    }),
  updateContract: (params: UpdateContractTypes) => {
    const { id, ...rest } = params;
    return axiosClient.put(`${END_POINTS_API.CONTRACTS}/${id}`, rest);
  },
};

export default ContractAPI;
