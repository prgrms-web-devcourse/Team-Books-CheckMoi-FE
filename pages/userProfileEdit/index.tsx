import { Badge } from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import * as S from "../../styles/UserProfileEditStyle";

interface UserProfileProps {
  name: string;
  email: string;
  profileImageUrl: string;
}

const UserProfileEditPage = ({
  name = "사용자 이름",
  email = "1234@naver.com",
  profileImageUrl = "https://picsum.photos/200",
}: UserProfileProps) => {
  return (
    <S.Container>
      <S.UserProfileImage>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <S.SmallAvatar>
              <CameraAlt />
            </S.SmallAvatar>
          }
        >
          <S.StyledAvatar src={profileImageUrl} />
        </Badge>
      </S.UserProfileImage>
      <S.StyledTextField
        id="full-width-text-field"
        label="이름"
        defaultValue={name}
      />
      <S.StyledTextField
        id="full-width-text-field"
        label="이메일"
        defaultValue={email}
      />
      <S.ButtonContainer>
        <S.StyledButton variant="contained">수정하기</S.StyledButton>
        <S.StyledButton variant="contained">뒤로가기</S.StyledButton>
      </S.ButtonContainer>
    </S.Container>
  );
};

export default UserProfileEditPage;
