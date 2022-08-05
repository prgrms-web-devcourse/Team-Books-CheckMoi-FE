import React, { useState, useEffect } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { useRouter } from "next/router";
import { StudyCard, TabPanel } from "../../components";
import { dummyStudy } from "../../commons/dummy";
import * as S from "../../styles/UserProfileStyle";
import { StudyDetail } from "../../features/StudyDetail/StudyDetail";

const StudyRecruitingPage = () => {
  const router = useRouter();
  const [studyId, setStudyId] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const { id } = router.query;
    if (id) {
      setStudyId(id as string);
      setOpen(true);
    }
  }, [router.query]);

  return (
    <div>
      <StudyDetail id={studyId} open={open} isPage />
    </div>
  );
};

export default StudyRecruitingPage;
