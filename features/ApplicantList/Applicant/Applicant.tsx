import { Avatar, Badge, Button, Typography } from "@mui/material";
import * as S from "./style";

interface ApplicantProps {
  id: number; // memberID, not userID
  name: string;
  image: string;
  temperature: number;
  onAccepted: (id: number) => void;
  onDenied: (id: number) => void;
}

export const Applicant = ({
  id,
  name,
  image,
  temperature,
  onAccepted,
  onDenied,
}: ApplicantProps) => {
  const handleAcceptButtonClick = () => {
    onAccepted(id);
  };

  const handleDeniedButtonClick = () => {
    onDenied(id);
  };

  return (
    <S.ApplicantContainer>
      <S.UserWrapper>
        <Badge badgeContent={temperature} color="primary">
          <Avatar src={image} />
        </Badge>
        <Typography>{name}</Typography>
      </S.UserWrapper>
      <S.ButtonWrapper>
        <Button variant="contained" onClick={handleAcceptButtonClick}>
          수락
        </Button>
        <Button variant="contained" onClick={handleDeniedButtonClick}>
          거절
        </Button>
      </S.ButtonWrapper>
    </S.ApplicantContainer>
  );
};
