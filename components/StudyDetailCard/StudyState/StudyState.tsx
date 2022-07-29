import * as S from "./style";

interface StudyStateProps {
  studyState: string;
}

export const StudyState = ({ studyState }: StudyStateProps) => {
  interface studyStateTypes {
    [key: string]: string;
  }

  const studyStateColor: studyStateTypes = {
    recruiting: "green",
    inProgress: "orange",
    finished: "red",
  };

  const studyStateText: studyStateTypes = {
    recruiting: "모집중",
    inProgress: "진행중",
    finished: "모집완료",
  };
  return (
    <S.StudyState color={studyStateColor[studyState]}>
      {studyStateText[studyState]}
    </S.StudyState>
  );
};
