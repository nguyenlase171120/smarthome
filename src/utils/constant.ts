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
};

export const ROUTES_NON_FOOTER_HEADER = [
  END_POINTS.CUSTOMER_ROLE.HOME,
  END_POINTS.CUSTOMER_ROLE.PACKAGE,
  END_POINTS.CUSTOMER_ROLE.CONTRACT,
];
