import * as S from "./style";

interface StudyStateProps {
  studyState: string;
}

export const StudyState = ({ studyState }: StudyStateProps) => {
  interface studyStateTypes {
    [key: string]: string;
  }

  const studyStateColor: studyStateTypes = {
    gathering: "green",
    inProgress: "orange",
    gatherFinished: "red",
  };

  const studyStateText: studyStateTypes = {
    gathering: "모집중",
    inProgress: "진행중",
    gatherFinished: "모집완료",
  };
  return (
    <S.StudyState color={studyStateColor[studyState]}>
      {studyStateText[studyState]}
    </S.StudyState>
  );
};
