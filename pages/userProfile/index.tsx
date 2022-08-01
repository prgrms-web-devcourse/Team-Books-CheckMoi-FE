import * as S from "../../styles/UserProfileStyle";

interface UserProfileProps {
  name: string;
  email: string;
  profileImageUrl: string;
}

const UserProfilePage = ({
  name = "사용자 이름",
  email = "1234@naver.com",
  profileImageUrl = "https://picsum.photos/200",
}: UserProfileProps) => {
  return (
    <S.Container>
      <S.UserProfileContainer>
        <S.StyledAvatar src={profileImageUrl}/>
        <S.User>
          <S.UserName>{name}</S.UserName>
          <S.UserInfo>{email} | 40℃</S.UserInfo>
        </S.User>
        <S.StyledButton variant="contained">프로필 수정</S.StyledButton>
      </S.UserProfileContainer>
      <S.StyledDivider />
    </S.Container>
  );
};

export default UserProfilePage;
