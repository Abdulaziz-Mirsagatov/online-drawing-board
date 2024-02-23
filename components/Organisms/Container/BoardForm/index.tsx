import { getBoards } from "@/services";
import BoardForm from "../../Form/Board";

const BoardFormContainer = async () => {
  const boards = await getBoards();
  return <BoardForm boards={boards} />;
};

export default BoardFormContainer;
