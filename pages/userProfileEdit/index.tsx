import { useState, useRef, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/router";
import { Badge } from "@mui/material";
import { CameraAlt } from "@mui/icons-material";
import { postImage, putUser } from "../../apis";
import {
  useUserContext,
  useUserActionContext,
} from "../../hooks/useUserContext";
import { getMyInfo } from "../../apis/user";
import * as S from "../../styles/UserProfileEditStyle";

const UserProfileEditPage = () => {
  const router = useRouter();
  const { user } = useUserContext();
  const { login } = useUserActionContext();
  const token =
    typeof document !== "undefined" ? document.cookie.split("=")[1] : "";

  const [image, setImage] = useState(user ? user.image : "");
  const [imageUrl, setImageUrl] = useState("");
  const [username, setUserName] = useState(user ? user.name : "");
  const [isUserExist, setIsUserExist] = useState(false);
  const imageRef = useRef<HTMLInputElement>(null);

  const handleChangeImage = async (e: any) => {
    const reader = new FileReader();
    const [file] = e.target.files;
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => setImage(reader.result as string);
      const imageData = await postImage({ token, file });
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
    const { id } = router.query;
    if (id) {
      await putUser({
        id: Number(id),
        name: username,
        image: imageUrl,
        token,
      });

      const updateUser = await getMyInfo(token);
      login(updateUser);
      router.push(`/userProfile/${id}`);
    }
  };

  useEffect(() => {
    setImageUrl(image);
  }, [image]);

  useEffect(() => {
    if (user) setIsUserExist(true);
  }, [user]);

  return (
    <S.Container>
      {isUserExist ? (
        <>
          {" "}
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
            defaultValue={user ? user.email : ""}
          />
          <S.ButtonContainer>
            <S.StyledButton variant="contained" onClick={handleUserInfoUpdate}>
              수정하기
            </S.StyledButton>
            <S.StyledButton variant="contained">뒤로가기</S.StyledButton>
          </S.ButtonContainer>
        </>
      ) : (
        <div>접근 불가한 페이지입니다.</div>
      )}
    </S.Container>
  );
};

export default UserProfileEditPage;
