import React, { useState, useEffect } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { StudyCard, TabPanel } from "../../components";
import { dummyStudy } from "../../commons/dummy";
import * as S from "../../styles/UserProfileStyle";

interface UserProfileProps {
  name: string;
  email: string;
  profileImageUrl: string;
  temperature: string;
}

const UserProfilePage = ({
  name = "사용자 이름",
  email = "1234@naver.com",
  profileImageUrl = "https://picsum.photos/200",
  temperature = "40℃",
}: UserProfileProps) => {
  const [mounted, setMounted] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <>
      <S.UserProfileContainer>
        <S.StyledAvatar src={profileImageUrl} />
        <S.User>
          <S.UserName>{name}</S.UserName>
          <S.UserInfo>
            {email} | {temperature}
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
  );
};

export default UserProfilePage;
