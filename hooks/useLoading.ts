import { useEffect } from "react";

function useLoadingState(setLoading: (loading: boolean) => void) {
  useEffect(() => {
    setLoading(false);

    // Cleanup on component unmount
    return () => {
      // Any cleanup logic if needed
    };
  }, [setLoading]); // Include setLoading in the dependency array to ensure it gets updated if it changes
}

export default useLoadingState;
