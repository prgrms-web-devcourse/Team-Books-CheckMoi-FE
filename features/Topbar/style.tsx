import { styled, alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";

export const StyledAppbar = styled(AppBar)(() => ({
  backgroundColor: "green",
}));

export const LogoIcon = styled(AutoStoriesIcon)(() => ({
  marginRight: "0.5rem",
}));

export const LogoText = styled(Typography)(({ theme }) => ({
  marginRight: "0.5rem",
  display: "flex",
  fontFamily: "monospace",
  fontWeight: "700",
  letterSpacing: "0.3rem",
  color: "inherit",
  textDecoration: "none",

  [theme.breakpoints.down("sm")]: {
    display: "none",
  },
}));

export const SearchInputContainer = styled("div")(() => ({
  flexGrow: 1,
  display: "flex",
  justifyContent: "center",
}));

export const SearchInput = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  marginLeft: 0,
  width: "100%",

  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },

  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",

  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",

    [theme.breakpoints.up("sm")]: {
      width: "20rem",

      "&:focus": {
        width: "30rem",
      },
    },
  },
}));

export const AvatarWrapper = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  margin: "auto",
  width: "fit-content",
}));

export const StyledDivider = styled(Divider)(() => ({
  width: "80%",
  textAlign: "center",
  margin: "0.5rem auto",
}));

export const StyledMenu = styled(Menu)(() => ({
  "& ul": {
    minWidth: "10rem",
    maxWidth: "20rem",
  },
}));

export const LogoutButtonWrapper = styled("div")(() => ({
  display: "flex",
  justifyContent: "end",
  paddingRight: "1rem",
}));
