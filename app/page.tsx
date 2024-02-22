import RegularButton from "@/components/Atoms/Button/Regular";
import BoardRow from "@/components/Organisms/Row/Board";

const HomePage = () => {
  const boards = [
    {
      title: "Board 1",
      image: "https://picsum.photos/200",
      link: "/board/1",
    },
    {
      title: "Board 2",
      image: "https://picsum.photos/200",
      link: "/board/2",
    },
    {
      title: "Board 3",
      image: "https://picsum.photos/200",
      link: "/board/3",
    },
  ];

  return (
    <section className="py-8 px-20 grid gap-4">
      <h1 className="text-4xl font-bold text-dark text-center">
        Welcome to the Online Board!
      </h1>
      <p className="text-lg text-dark text-center">
        This is a simple online board to share ideas and collaborate with
        others.
      </p>
      <div className="flex justify-between items-end">
        <h1 className="text-4xl text-dark font-bold">Boards</h1>
        <RegularButton text="Create" icon="ic:baseline-plus" size="text-3xl" />
      </div>
      <div className="w-full h-6 rounded-lg bg-accent"></div>
      <BoardRow boards={boards} />
    </section>
  );
};

export default HomePage;
