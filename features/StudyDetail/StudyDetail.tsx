import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import type { StudyDetailType } from "../../types/studyType";
import { StudyContent } from "../../components/StudyContent";
import { StudyDetailCard } from "../../components/StudyDetailCard";
import { getStudyDetailInfo } from "../../apis/study";
import { Spacer } from "../../components";

interface StudyDetailProps {
  id: string;
  open: boolean;
  isPage?: boolean;
}

export const StudyDetail = ({
  id,
  open = false,
  isPage = false,
}: StudyDetailProps) => {
  const [studyInfo, setStudyInfo] = useState<StudyDetailType>({
    study: {},
  } as StudyDetailType);

  useEffect(() => {
    const studyInfoFetch = async (studyId: string) => {
      const { study, members, book, description } = await getStudyDetailInfo(
        studyId
      );

      setStudyInfo({
        study,
        members,
        book,
        description: study.description,
      });
    };
    if (open) studyInfoFetch(id);
  }, [open]);

  return (
    <div>
      <StudyDetailCard study={studyInfo.study} members={studyInfo.members} />
      <Divider color="grey" />
      <StudyContent
        description={studyInfo.description}
        isMember={false}
        onClick={() => {}}
        height={isPage ? "40vh" : 10}
      />
    </div>
  );
};
