import {
  FileTextOutlined,
  HomeOutlined,
  PhoneOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const END_POINTS = {
  AUTHENTICATION: {
    LOGIN: "/api/auth/sign-in",
    SIGN_UP: "/api/auth/sign-up",
  },
  CUSTOMER_ROLE: {
    HOME: "/customer-role/home",
    PACKAGE: "/customer-role/packages",
    PACKAGE_DETAIL: "/customer-role/packages/:id",
    CONTRACT: "/customer-role/contracts",
    SURVEY: "/customer-role/survey",
  },
  USER_PROFILE: "/user-profile",
  STAFF_ROLE: {
    SURVEY_REPORT: "/staff-role/survey-report",
  },
};

export const END_POINTS_API = {
  SIGN_IN: "/api/auth",
  PACKAGES: {
    GET_ALL: "/api/device-packages",
  },

  CUSTOMER_ROLE: {
    SIGN_UP: "/api/customers",
  },

  CONTRACTS: "/api/contracts",
  SURVEY: "/api/survey-requests",
  FEEDBACK: "/api/feedbacks",
  SURVEY_REPORT: "/api/survey-reports",
};

export const ROUTES_NON_FOOTER_HEADER = [
  END_POINTS.CUSTOMER_ROLE.HOME,
  END_POINTS.CUSTOMER_ROLE.PACKAGE,
  END_POINTS.CUSTOMER_ROLE.CONTRACT,
  END_POINTS.CUSTOMER_ROLE.SURVEY,
  END_POINTS.USER_PROFILE,
  END_POINTS.STAFF_ROLE.SURVEY_REPORT,
];

export const CUSTOMER_ID = "ba192f6f-e0fb-46f4-b427-4cb324f6538c";

export const STAFF_FOOTER = [
  {
    label: "Báo cáo",
    value: END_POINTS.STAFF_ROLE.SURVEY_REPORT,
    icon: <PhoneOutlined />,
  },
  {
    label: "Hợp đồng",
    value: END_POINTS.STAFF_ROLE.SURVEY_REPORT,
    icon: <FileTextOutlined />,
  },
  {
    label: "Tài khoản",
    value: END_POINTS.USER_PROFILE,
    icon: <UserOutlined />,
  },
];

export const CUSTOMER_FOOTER = [
  {
    label: "Trang chủ",
    value: END_POINTS.CUSTOMER_ROLE.HOME,
    icon: <HomeOutlined />,
  },
  {
    label: "Hợp đồng",
    value: END_POINTS.CUSTOMER_ROLE.CONTRACT,
    icon: <FileTextOutlined />,
  },
  {
    label: "Khảo sát",
    value: END_POINTS.CUSTOMER_ROLE.SURVEY,
    icon: <PhoneOutlined />,
  },
  {
    label: "Tài khoản",
    value: END_POINTS.USER_PROFILE,
    icon: <UserOutlined />,
  },
];