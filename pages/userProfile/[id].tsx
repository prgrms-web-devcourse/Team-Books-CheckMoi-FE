import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Skeleton, Box, Tabs, Tab } from "@mui/material";
import type { UserType } from "../../types/userType";
import type { StudyType } from "../../types/studyType";
import {
  getUser,
  getOpenStudy,
  getPartiStudy,
  getFinishStudy,
} from "../../apis";
import { TabPanel } from "../../components";
import { StudyCardList } from "../../features";
import { useUserContext } from "../../hooks/useUserContext";
import * as S from "../../styles/UserProfileStyle";

const userProfile = () => {
  const [userInfo, setUserInfo] = useState({} as UserType);
  const [tabNumber, setTabNumber] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [openStudy, setOpenStudy] = useState<StudyType[]>([]);
  const [partiStudy, setPartiStudy] = useState<StudyType[]>([]);
  const [finishStudy, setFinishStudy] = useState<StudyType[]>([]);

  const router = useRouter();
  const { user } = useUserContext();

  const ownerInfo = user;
  const token =
    typeof document !== "undefined" ? document.cookie.split("=")[1] : "";

  const { id } = router.query;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabNumber(newValue);
  };

  useEffect(() => {
    const userInfoApi = async (userid: number) => {
      if (ownerInfo && ownerInfo.id === userid) {
        setUserInfo(ownerInfo);
        setIsOwner(true);
      } else {
        const userData = await getUser({ id: userid, token });
        setUserInfo(userData);
      }
      const openStudyData = await getOpenStudy({ id: userid, token });
      if (openStudyData) setOpenStudy(openStudyData.studies);
      const partiStudyData = await getPartiStudy({ id: userid, token });
      if (partiStudyData) setPartiStudy(partiStudyData.studies);
      const finishStudyData = await getFinishStudy({ id: userid, token });
      if (finishStudyData) setFinishStudy(finishStudyData.studies);

      setLoading(false);
    };

    if (token && id) userInfoApi(Number(id));
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
          {/* TODO StudyCard SKeleton 구현하면 삭제할 예정 */}
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
            <S.StyledAvatar src={userInfo.image} />
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
                  label="참여한 스터디"
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
              <StudyCardList studies={openStudy} />
            </TabPanel>
            <TabPanel value={tabNumber} index={1}>
              <StudyCardList studies={partiStudy} />
            </TabPanel>
            <TabPanel value={tabNumber} index={2}>
              <StudyCardList studies={finishStudy} />
            </TabPanel>
          </S.StudyContainer>
        </>
      )}
    </div>
  );
};

export default userProfile;
