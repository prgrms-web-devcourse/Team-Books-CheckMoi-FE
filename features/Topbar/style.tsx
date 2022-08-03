import { styled, alpha } from "@mui/material/styles";
import { Typography, InputBase, AppBar } from "@mui/material";
import { AutoStories } from "@mui/icons-material";

export const StyledAppbar = styled(AppBar)(() => ({
  backgroundColor: "green",
}));

export const LogoIcon = styled(AutoStories)(() => ({
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
