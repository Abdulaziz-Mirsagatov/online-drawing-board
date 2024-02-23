import { getBoards } from "@/services";
import BoardForm from "../../Form/Board";

const BoardFormContainer = async () => {
  const boards = await getBoards();
  console.log(boards);
  return <BoardForm boards={boards} />;
};

export default BoardFormContainer;
