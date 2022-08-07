import { useState, useRef } from "react";
import { useRouter } from 'next/router'
import axios from "axios";
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
  const imageref = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjcsInJvbGUiOiJST0xFX0xPR0lOIiwiaWF0IjoxNjU5ODc1NDY4LCJleHAiOjE2NTk4NzkwNjh9.OloP1tFCMH7F7zX_fdYAmnP9-716XLPSiI2m0R83ijQ";

  const handleChangeImage = async (e: any) => {
    const reader = new FileReader();
    const [file] = e.target.files;
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => setImage(reader.result as string);
    }
    // TODO image api 분리 
    const formData = new FormData();
    formData.append("files", file);
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API_END_POINT}/images`,
      formData,
      {
        headers: {
          Authorization: `bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // const imagedata = await postImage(token, file)
    // console.log(imagedata);
    setImageUrl(data.data.urls[0]);
  };

  const handleClickInput = () => {
    if (imageref.current !== null) imageref.current.click();
  };

  const handleNameChange = (e: any) => {
    setUserName(e.target.value);
  };

  const handleUserInfoUpdate = async () => {
    await putUser(id, name, imageUrl, token);
    router.push(`/userProfile/${id}`);
  };

  return (
    <S.Container>
      <input
        ref={imageref}
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
