import { Box, Typography, InputBase, AppBar } from "@mui/material";
import styled from "@emotion/styled";

export const StyledAppbar = styled(AppBar)`
  background-color: #5b9ad9;
`;

export const LogoContainer = styled(Box)`
  height: 4rem;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export const LogoText = styled(Typography)`
  margin: 0 0.5rem;
  display: flex;
  font-family: monospace;
  font-weight: 700;
  letter-spacing: 0.3rem;
  color: inherit;
  text-decoration: none;

  @media (max-width: 512px) {
    display: none;
  }
`;

export const SearchInputContainer = styled("div")`
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

export const SearchInput = styled("div")`
  position: relative;
  border-radius: 0.25rem;
  background-color: rgba(255, 255, 255, 0.15);
  margin-left: 0;
  width: 100%;

  @media (max-width: 512px) {
    margin-left: 0.5rem;
    width: auto;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.25);
  }
`;
export const SearchIconWrapper = styled("div")`
  padding: 0 1rem;
  height: 100%;
  position: absolute;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledInputBase = styled(InputBase)`
  color: inherit;

  & .MuiInputBase-input {
    padding: 0.5rem;
    padding-left: calc(1em + 2rem);
    transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    width: 100%;

    @media (min-width: 512px) {
      width: 20rem;

      &:focus {
        width: 30rem;
      }
    }
  }
`;
