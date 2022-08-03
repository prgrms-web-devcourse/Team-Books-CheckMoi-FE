import { useEffect, useState } from "react";
import { Divider } from "@mui/material";
import * as S from "./style";
import type { StudyDetailType } from "../../types/studyType";
import { StudyContent } from "../../components/StudyContent";
import { StudyDetailCard } from "../../components/StudyDetailCard";

interface StudyDetailProps {
  id: string;
  open: boolean;
}

export const StudyDetail = ({ id, open = false }: StudyDetailProps) => {
  const [studyInfo, setStudyInfo] = useState<StudyDetailType>(
    {} as StudyDetailType
  );

  useEffect(() => {
    const studyInfoFetch = async (studyId: string) => {
      const serverData = await fetch(
        `https://dev.checkmoi.ga/api/studies/${studyId}`
      );
      const { data } = await serverData.json();
      setStudyInfo({ ...data.study, members: data.members });
    };
    studyInfoFetch(id);
  }, [open]);

  return (
    <div>
      <StudyDetailCard
        name={studyInfo.name}
        // thumbnailUrl={studyInfo.thumbnailUrl}
        thumbnailUrl=""
        maxParticipant={studyInfo.maxParticipant}
        currentParticipant={studyInfo.currentParticipant}
        gatherStartDate={studyInfo.gatherStartDate}
        gatherEndDate={studyInfo.gatherEndDate}
        studyStartDate={studyInfo.studyStartDate}
        studyEndDate={studyInfo.studyEndDate}
        members={studyInfo.members}
      />
      <Divider color="black" />
      <StudyContent
        description={studyInfo.description}
        isMember={false}
        onClick={() => {}}
      />
    </div>
  );
};
