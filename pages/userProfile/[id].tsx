/* eslint-disable react/jsx-no-useless-fragment */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Skeleton, Box, Tabs, Tab } from "@mui/material";
import { UserType } from "../../types/userType";
import { StudyCard, TabPanel } from "../../components";
import { dummyStudy } from "../../commons/dummy";
import * as S from "../../styles/UserProfileStyle";

const userProfile = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserType>({} as UserType);
  const [value, setValue] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlIjoiUk9MRV9MT0dJTiIsInVzZXJJZCI6NywiaWF0IjoxNjU5Njg3MTcwLCJleHAiOjE2NTk2OTA3NzB9.Ws-o97JBaHo4spVxzpFiAF45hBr3_8XCA4UCU1fsU40";

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    const userInfoFetch = async (id: string) => {
      const userdata = await fetch(
        `${process.env.NEXT_PUBLIC_API_END_POINT}/users/${id}`,
        {
          // TODO 전역으로 저장된 token 가져오기
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = await userdata.json();
      setUserInfo(data);
      setLoading(false);
    };
    const { id } = router.query;
    if (id && typeof id === "string") userInfoFetch(id);
  }, [router.isReady]);

  console.log(loading, userInfo);

  return (
    <>
      {loading ? (
        <>
          <S.UserProfileContainer>
            <Skeleton
              animation="wave"
              variant="circular"
              width={80}
              height={80}
            />
            <S.User>
              <S.UserName>
                <Skeleton
                  animation="wave"
                  height={10}
                  width="80%"
                  style={{ marginBottom: 6 }}
                />
              </S.UserName>
              <S.UserInfo>
                <Skeleton animation="wave" height={10} width="40%" />
              </S.UserInfo>
            </S.User>
          </S.UserProfileContainer>
          <S.StyledDivider />
          <S.StudyContainer>
            <Skeleton
              sx={{ height: 190 }}
              animation="wave"
              variant="rectangular"
            />
          </S.StudyContainer>
        </>
      ) : (
        <>
          <S.UserProfileContainer>
            <S.StyledAvatar src={userInfo.profileImageUrl} />
            <S.User>
              <S.UserName>{userInfo.name}</S.UserName>
              <S.UserInfo>
                {userInfo.email} | {userInfo.temperature}°C
              </S.UserInfo>
            </S.User>
            <S.StyledButton variant="contained">프로필 수정</S.StyledButton>
          </S.UserProfileContainer>
          <S.StyledDivider />
          <S.StudyContainer>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab
                  label="개설한 스터디"
                  id="simple-tab-0"
                  aria-controls="simple-tabpanel-0"
                />
                <Tab
                  label="참여 중인 스터디"
                  id="simple-tab-1"
                  aria-controls="simple-tabpanel-1"
                />
                <Tab
                  label="완료한 스터디"
                  id="simple-tab-2"
                  aria-controls="simple-tabpanel-2"
                />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <StudyCard size={128} study={dummyStudy} onClick={() => {}} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <StudyCard size={128} study={dummyStudy} onClick={() => {}} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <StudyCard size={128} study={dummyStudy} onClick={() => {}} />
            </TabPanel>
          </S.StudyContainer>
        </>
      )}
    </>
  );
};

export default userProfile;
