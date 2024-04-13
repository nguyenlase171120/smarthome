import { useMutation } from "@tanstack/react-query";
import { onHandleErrorAPIResponse } from "../../utils/helper";
import ContractAPI from "../../api/Contract";

const StaffContract = () => {
  const {
    isPending: isLoadingContractList,
    data,
    mutate: mutateContracts,
  } = useMutation({
    mutationFn: ContractAPI.getAllContracts,
    onError: (error) => {
      onHandleErrorAPIResponse(error);
    },
    onSuccess: (res) => {},
  });

  if (isLoadingContractList) {
  }

  return <div>StaffContract</div>;
};

export default StaffContract;
