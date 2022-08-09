import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Skeleton, Box, Tabs, Tab } from "@mui/material";
import type { UserType } from "../../types/userType";
import { StudyCard, TabPanel } from "../../components";
import { dummyStudy } from "../../commons/dummy";
import * as S from "../../styles/UserProfileStyle";
import { getUser } from "../../apis";
import { useUserContext } from "../../hooks/useUserContext";

const userProfile = () => {
  const [userInfo, setUserInfo] = useState({} as UserType);
  const [tabNumber, setTabNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);

  const router = useRouter();
  const user = useUserContext();

  const ownerInfo = user;
  const token =
    typeof document !== "undefined" ? document.cookie.split("=")[1] : "";

  const { id } = router.query;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabNumber(newValue);
  };

  useEffect(() => {
    if (ownerInfo && ownerInfo.id.toString() === id) {
      setLoading(false);
      setUserInfo(ownerInfo);
      setIsOwner(true);
    } else {
      const userInfoApi = async (userid: string) => {
        // TODO study정보와 user정보 같이 가져오는 api로 수정해야함
        const userdata = await getUser(userid, token);
        setUserInfo(userdata);
        setLoading(false);
      };
      if (token && id) userInfoApi(id as string);
    }
  }, [id]);

  return (
    <div>
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
            {isOwner && (
              <S.StyledButton
                variant="contained"
                onClick={() => {
                  router.push({ pathname: "/userProfileEdit", query: { id } });
                }}
              >
                프로필 수정
              </S.StyledButton>
            )}
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
    </div>
  );
};

export default userProfile;
