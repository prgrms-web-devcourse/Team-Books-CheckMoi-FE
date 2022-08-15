import Link from "next/link";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <img
        alt="길잃은 북쩍이"
        src="/images/logo.png"
        width="50%"
        height="auto"
      />
      <Link href="/">
        <h1 style={{ cursor: "pointer" }}>
          북쩍이가 길을 잃었습니다 메인페이지로 돌아가주세요
        </h1>
      </Link>
    </div>
  );
};

export default NotFound;
