import BoardContainer from "@/components/Organisms/Container/Board";
import { Suspense } from "react";
import { BoardPageProps } from "./types";
import Loading from "../loading";

const BoardPage = ({ params }: BoardPageProps) => {
  return (
    <Suspense fallback={<Loading />}>
      <BoardContainer boardId={params.boardId} />
    </Suspense>
  );
};

export default BoardPage;
