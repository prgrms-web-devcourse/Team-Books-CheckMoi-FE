import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import type { StudyType } from "../../types/studyType";
import { StudyContent } from "../../components/StudyContent";
import { StudyDetailCard } from "../../components/StudyDetailCard";
import { getStudyDetailInfo } from "../../apis/study";
import { UserType } from "../../types/userType";
import { BookType } from "../../types/bookType";

interface StudyDetailProps {
  id: string;
  open: boolean;
  isPage?: boolean;
}

interface Test {
  study: StudyType;
  members: UserType[];
  book: BookType;
}

export const StudyDetail = ({
  id,
  open = false,
  isPage = false,
}: StudyDetailProps) => {
  const [studyInfo, setStudyInfo] = useState({
    study: {},
  } as Test);

  useEffect(() => {
    const studyInfoFetch = async (studyId: string) => {
      const { study, members, book } = await getStudyDetailInfo(studyId);

      setStudyInfo({
        study,
        members,
        book,
      });
    };
    if (open) studyInfoFetch(id);
  }, [open]);

  return (
    <div>
      <StudyDetailCard study={studyInfo.study} members={studyInfo.members} />
      <Divider color="grey" />
      <StudyContent
        description={studyInfo.study.description}
        isMember={false}
        onClick={() => {}}
        height={isPage ? "40vh" : 10}
      />
    </div>
  );
};
