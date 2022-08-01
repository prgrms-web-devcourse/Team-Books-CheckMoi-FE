const isOverTime = (endDate: string) => {
  if (Date.parse(endDate) - Date.now() < 0) return true;
  return false;
};

const isStudying = (startDate: string, endDate: string) => {
  return isOverTime(startDate) ? !isOverTime(endDate) : false;
};

const isStudyEnding = (endDate: string) => {
  return isOverTime(endDate);
};

const isGathering = (endDate: string) => {
  return !isOverTime(endDate);
};

//
export const selectStudyState = (
  gatherEndDate: string,
  studyStartDate: string,
  studyEndDate: string
) => {
  if (isStudyEnding(studyEndDate) && !isGathering(gatherEndDate)) return "done";
  return isStudying(studyStartDate, studyEndDate)
    ? "inProgress"
    : isGathering(gatherEndDate)
    ? "recruiting"
    : "finished";
};
