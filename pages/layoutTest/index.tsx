import { useRouter } from "next/router";
import Image from "next/future/image";

interface DummyProps {
  word: string | undefined | string[];
}

const DummyBook = ({ word }: DummyProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Image
        src="https://i.picsum.photos/id/962/200/300.jpg?hmac=wvuv8EVOoNE5J3sBkBx-1wcVHNbgJ_Z1dS98YhnShjM"
        width={300}
        height={300}
        alt="Test"
      />
      {word}
    </div>
  );
};

const LayoutTestPage = () => {
  const router = useRouter();
  const { word } = router.query;
  // TODO 더미 데이터 만들어서 페이지네이션 만들기
  return (
    <div>
      {word}
      <DummyBook word={word} />
    </div>
  );
};

export default LayoutTestPage;
