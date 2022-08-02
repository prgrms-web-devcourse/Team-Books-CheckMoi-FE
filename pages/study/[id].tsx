import { useRouter } from "next/router";

// ANCHOR 회원 상세 보기 페이지 스터디 카드를 클릭하면 이곳으로 이동한다.
// ANCHOR 스터디 모집 (모달 or 페이지)에서 '스터디룸 이동하기'를 클릭하면 이곳으로 이동한다.
// NOTE 두 곳 모두 스터디 ID를 이곳으로 전달해야 한다.

// NOTE 스터디 ID를 사용해서 스터디 상세 정보를 조회할 수 있는 API가 없다?...
// TODO 스터디 정보를 사용해서 BookDetailCard를 만든다. (StudyDetailProps 타입 참고)
// TODO notice, article, free-talk, info(admin only) 탭을 만든다.
// TODO 각 탭의 디자인을 결정한다.

const StudyDetailPage = () => {
  const router = useRouter();

  return <h1>{router.query.id}</h1>;
};

export default StudyDetailPage;
