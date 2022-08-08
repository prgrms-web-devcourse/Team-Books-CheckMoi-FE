/* eslint-disable react/jsx-no-useless-fragment */
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Skeleton, Box, Tabs, Tab } from "@mui/material";
import { UserType } from "../../types/userType";
import { StudyCard, TabPanel } from "../../components";
import { dummyStudy } from "../../commons/dummy";
import * as S from "../../styles/UserProfileStyle";
import { getUser } from "../../apis";

const userProfile = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserType>({} as UserType);
  const [tabNumber, setTabNumber] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  // TODO 전역으로 저장된 token 가져오기
  // TODO 전역으로 저정된 유저id와 불러온 유저id가 같으면 프로필 수정 버튼 띄우는 로직 필요
  const token =
    "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjcsInJvbGUiOiJST0xFX0xPR0lOIiwiaWF0IjoxNjU5ODc5MDYxLCJleHAiOjE2NTk4ODI2NjF9.73DMt8k5pL2-wD7mZsTNLc3f-n7G_DJrNItuOQ7omhA";
  const { id } = router.query;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabNumber(newValue);
  };

  useEffect(() => {
    const userInfoApi = async (userid: string) => {
      // TODO study정보와 user정보 같이 가져오는 api로 수정해야함
      const userdata = await getUser(userid, token);
      setUserInfo(userdata);
      setLoading(false);
    };
    if (id) userInfoApi(id as string);
  }, [router.isReady]);

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
            <S.StyledButton
              variant="contained"
              onClick={() => {
                router.push({ pathname: "/userProfileEdit", query: { id } });
              }}
            >
              프로필 수정
            </S.StyledButton>
          </S.UserProfileContainer>
          <S.StyledDivider />
          <S.StudyContainer>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={tabNumber}
                onChange={handleTabChange}
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
            <TabPanel value={tabNumber} index={0}>
              <StudyCard size={128} study={dummyStudy} onClick={() => {}} />
            </TabPanel>
            <TabPanel value={tabNumber} index={1}>
              <StudyCard size={128} study={dummyStudy} onClick={() => {}} />
            </TabPanel>
            <TabPanel value={tabNumber} index={2}>
              <StudyCard size={128} study={dummyStudy} onClick={() => {}} />
            </TabPanel>
          </S.StudyContainer>
        </>
      )}
    </>
  );
};

export default userProfile;
