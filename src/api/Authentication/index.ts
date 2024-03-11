import { END_POINTS } from "../../utils/constant";
import axiosClient from "../axiosClient";
import { LoginAccountTypes } from "./type";

const AuthenticationAPI = {
  LoginAccount: (params: LoginAccountTypes) =>
    axiosClient.post(END_POINTS.AUTHENTICATION.LOGIN, params),
};

export default AuthenticationAPI;
