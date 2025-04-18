import { createContext, ReactNode, useContext, useState } from "react";
import { LoadingBarContainer, useLoadingBar } from "react-top-loading-bar";

export type LoaderContextProps = {
  isLoading: boolean;
  start: (text?: string) => void;
  stop: () => void;
  loaderText: string;
};

export const LoaderContext = createContext<LoaderContextProps>(
  {} as LoaderContextProps
);

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loaderText, setLoaderText] = useState("");
  const { start: startProgress, complete } = useLoadingBar({
    color: "#999"
  })

  const start = (loaderText = "Loader...") => {
    setLoaderText(loaderText);
    setIsLoading(true);
    startProgress();
  };

  const stop = () => {
    setIsLoading(false)
    complete();
  };

  return (
    <LoadingBarContainer>
      <LoaderContext.Provider
      value={{
        isLoading,
        start,
        stop,
        loaderText
      }}
    >
      {children}
    </LoaderContext.Provider>
    </LoadingBarContainer>
  );
};


export const useLoader = () => {
  const loaderContext = useContext(LoaderContext)

  if (!loaderContext) {
    throw new Error('Please use useLoader inside the context of LoaderProvider')
  }

  return {
    start: loaderContext.start,
    stop: loaderContext.stop,
    isLoading: loaderContext.isLoading,
    loaderText: loaderContext.loaderText,
  }
}