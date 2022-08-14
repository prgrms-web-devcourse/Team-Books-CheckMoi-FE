import { useCallback } from "react";
import { useSnackbar } from "notistack";
import type { VariantType } from "notistack";
import * as S from "./style";

type RenderSnackbarType = (message: string, variant?: VariantType) => void;

export const useOurSnackbar = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const renderSnackbar = useCallback<RenderSnackbarType>(
    (message, variant = "success") => {
      enqueueSnackbar(message, {
        variant,
        autoHideDuration: 2000,
        anchorOrigin: {
          horizontal: "right",
          vertical: "bottom",
        },
        action: (snackbarId) => (
          <S.StyledButton onClick={() => closeSnackbar(snackbarId)}>
            닫기
          </S.StyledButton>
        ),
      });
    },
    []
  );

  return { renderSnackbar };
};
