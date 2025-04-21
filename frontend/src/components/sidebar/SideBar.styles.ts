import { SxProps, Theme } from "@mui/system";

export const sidebarBoxStyle: SxProps<Theme> = {
  minHeight: "300px",
  width: "100%",
  position: "absolute",
  right: 0,
};

export const listItemStyle: SxProps<Theme> = {
  paddingY: 1,
  color: "primary.main",
  textDecoration: "none",
  "&:hover": {
    backgroundColor: "action.hover",
    borderRadius: 1,
  },
};

export const listTextStyle: SxProps<Theme> = {
  fontWeight: 500,
  fontSize: "1rem",
};
