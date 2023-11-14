import { dm_sans } from "./fontConfig";

const theme = {
  token: {
    fontFamily: dm_sans.style.fontFamily,
    fontSize: 12,
    colorPrimary: "#52c41a",
    algorithm:
      appTheme === LIGHTTHEME ? theme.defaultAlgorithm : theme.darkAlgorithm,
  },
};

export default theme;
