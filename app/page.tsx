import BoardFormContainer from "@/components/Organisms/Container/BoardForm";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <section className="py-8 px-20 grid gap-4">
      <h1 className="text-4xl font-bold text-dark text-center">
        Welcome to the Online Board!
      </h1>
      <p className="text-lg text-dark text-center">
        This is a simple online board to share ideas and collaborate with
        others.
      </p>
      <Suspense
        fallback={
          <div className="h-96 w-full flex justify-content items-center text-lg text-dark">
            Loading...
          </div>
        }
      >
        <BoardFormContainer />
      </Suspense>
    </section>
  );
};

export default HomePage;
