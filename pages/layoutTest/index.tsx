import Image from "next/future/image";
import { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import Pagination from "@mui/material/Pagination";

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
  const displayBookCount = 8;

  const dummyArray = Array.from(new Array(100), (x, i) => `${i + 1}`);
  const lastPage = Math.ceil(dummyArray.length / displayBookCount);
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState<string[]>([]);

  useEffect(() => {
    if (page === lastPage)
      setPageData(dummyArray.slice(displayBookCount * (page - 1)));
    else
      setPageData(
        dummyArray.slice(
          displayBookCount * (page - 1),
          displayBookCount * (page - 1) + displayBookCount
        )
      );
  }, [page]);

  const handlePage = (e: ChangeEvent<unknown> | null, inputPage: number) => {
    setPage(inputPage);
  };

  return (
    <>
      <div>
        <ul
          style={{
            listStyle: "none",
            display: "grid",
            gridTemplateRows: "1fr 1fr",
            gridTemplateColumns: "1fr 1fr 1fr 1fr",
          }}
        >
          {pageData.map((data) => (
            <li key={Math.random()}>
              <DummyBook word={data} />
            </li>
          ))}
        </ul>
      </div>
      <Pagination
        count={Math.ceil(dummyArray.length / 8)}
        variant="outlined"
        shape="rounded"
        color="primary"
        page={page}
        onChange={handlePage}
      />
    </>
  );
};

export default LayoutTestPage;
