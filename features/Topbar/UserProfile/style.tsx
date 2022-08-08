import { styled } from "@mui/material/styles";
import { Menu, Divider } from "@mui/material";

export const StyledMenu = styled(Menu)(() => ({
  "& ul": {
    minWidth: "10rem",
    maxWidth: "20rem",
  },
}));

export const AvatarWrapper = styled("div")(() => ({
  display: "flex",
  padding: "0.5rem 1rem",
  alignItems: "center",
  gap: "1rem",
  width: "fit-content",
  fontSize: "1.2rem",
}));

export const StyledUserInfo = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));

export const SmallSpan = styled("span")(() => ({
  fontSize: "0.5rem",
}));

export const StyledDivider = styled(Divider)(() => ({
  textAlign: "center",
  margin: "0.5rem 1rem",
}));

export const LogoutButtonWrapper = styled("div")(() => ({
  display: "flex",
  justifyContent: "end",
  paddingRight: "1rem",
}));

export const ButtonContainer = styled("div")`
  display: flex;
  justify-content: space-between;
`;
