import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { StudyDetail } from "../../features/StudyDetail/StudyDetail";

const StudyRecruitingPage = () => {
  const router = useRouter();
  const [studyId, setStudyId] = useState(-1);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const id = Number(router.query.id as string);
    if (id) {
      setStudyId(id);
      setOpen(true);
    }
  }, [router.query]);

  return <StudyDetail id={studyId} open={open} isPage />;
};

export default StudyRecruitingPage;
