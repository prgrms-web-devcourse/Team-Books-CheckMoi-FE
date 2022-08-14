import type { StudyStatusType } from "../../../types/studyType";
import * as S from "./style";

interface StudyStateProps {
  studyState: StudyStatusType | null;
}

export const StudyState = ({ studyState }: StudyStateProps) => {
  interface studyStateTypes {
    [key: string]: string;
  }

  const studyStateColor: studyStateTypes = {
    recruiting: "green",
    recruitingFinished: "red",
    inProgress: "orange",
    finished: "red",
  };

  const studyStateText: studyStateTypes = {
    recruiting: "모집중",
    recruitingFinished: "모집완료",
    inProgress: "진행중",
    finished: "진행완료",
  };
  return (
    <>
      {studyState ? (
        <S.StudyState color={studyStateColor[studyState]}>
          {studyStateText[studyState]}
        </S.StudyState>
      ) : (
        <></>
      )}
    </>
  );
};
