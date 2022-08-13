import { Avatar, Badge, Button, Typography } from "@mui/material";
import * as S from "./style";

interface ApplicantProps {
  id: number; // memberID, not userID
  name: string;
  image: string;
  temperature: number;
  onAccepted: (id: string) => void;
  onDenied: (id: string) => void;
}

export const Applicant = ({
  id,
  name,
  image,
  temperature,
  onAccepted,
  onDenied,
}: ApplicantProps) => {
  // TODO 필요한 것,현재 스터디 ID, 방장 토큰, 승낙/거절 유저 ID
  const handleAcceptButtonClick = () => {
    onAccepted(id.toString());
  };

  const handleDeniedButtonClick = () => {
    onDenied(id.toString());
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
