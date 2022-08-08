import { useState, useRef, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { Badge } from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { postImage, putUser } from "../../apis";
import * as S from "../../styles/UserProfileEditStyle";

interface UserProfileProps {
  id: string;
  name: string;
  email: string;
  profileImageUrl: string;
}

const UserProfileEditPage = ({
  id = "7",
  name = "사용자 이름",
  email = "1234@naver.com",
  profileImageUrl = "",
}: UserProfileProps) => {
  const [image, setImage] = useState(profileImageUrl);
  const [imageUrl, setImageUrl] = useState("");
  const [username, setUserName] = useState(name);
  const imageRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9MT0dJTiIsInVzZXJJZCI6NywiaWF0IjoxNjU5OTM1MjY2LCJleHAiOjE2NTk5Mzg4NjZ9.6jttoMhex-ylHnqF5W4MXLgYy7sU_0vA8FX5Ulf0cSU";

  const handleChangeImage = async (e: any) => {
    const reader = new FileReader();
    const [file] = e.target.files;
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => setImage(reader.result as string);
      const imageData = await postImage({token, file});
      setImageUrl(imageData);
    }
  };

  const handleClickInput = () => {
    if (imageRef.current !== null) imageRef.current.click();
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const handleUserInfoUpdate = async () => {
    await putUser({ id, name: username, image: imageUrl, token });
    router.push(`/userProfile/${id}`);
  };

  useEffect(() => {
    setImageUrl(image);
  }, [image]);

  return (
    <S.Container>
      <input
        ref={imageRef}
        type="file"
        accept="image/*"
        onChange={handleChangeImage}
        style={{ display: "none" }}
      />
      <S.UserProfileImage onClick={handleClickInput}>
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <S.SmallAvatar>
              <CameraAlt />
            </S.SmallAvatar>
          }
        >
          <S.StyledAvatar src={image} />
        </Badge>
      </S.UserProfileImage>
      <S.StyledTextField
        value={username}
        id="fullWidth"
        label="이름"
        onChange={handleNameChange}
      />
      <S.StyledTextField
        disabled
        id="fullWidth"
        label="이메일"
        defaultValue={email}
      />
      <S.ButtonContainer>
        <S.StyledButton variant="contained" onClick={handleUserInfoUpdate}>
          수정하기
        </S.StyledButton>
        <S.StyledButton variant="contained">뒤로가기</S.StyledButton>
      </S.ButtonContainer>
    </S.Container>
  );
};

export default UserProfileEditPage;
