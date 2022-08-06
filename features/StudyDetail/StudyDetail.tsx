import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import type { StudyDetailType } from "../../types/studyType";
import { StudyContent } from "../../components/StudyContent";
import { StudyDetailCard } from "../../components/StudyDetailCard";
import { getStudyDetailInfo } from "../../apis/study";

interface StudyDetailProps {
  id: string;
  open: boolean;
}

export const StudyDetail = ({ id, open = false }: StudyDetailProps) => {
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
        description,
      });
    };
    studyInfoFetch(id);
  }, [open]);

  return (
    <div>
      <StudyDetailCard study={studyInfo.study} members={studyInfo.members} />
      <Divider color="black" />
      <StudyContent
        description={studyInfo.description}
        isMember={false}
        onClick={() => {}}
      />
    </div>
  );
};
