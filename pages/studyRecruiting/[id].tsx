import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
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

  return <StudyDetail id={studyId} open={open} isPage />;
};

export default StudyRecruitingPage;
