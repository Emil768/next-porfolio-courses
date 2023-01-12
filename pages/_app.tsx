import type { AppProps } from "next/app";
import { Container, Header } from "components";

import "../styles/index.scss";
import { useEffect } from "react";
import { useAuthStore } from "store";

const App = ({ Component, pageProps }: AppProps) => {
  const { fethAuthMe } = useAuthStore();

  useEffect(() => {
    fethAuthMe();
  }, []);

  return (
    <>
      <Container>
        <Header /> <Component {...pageProps} />
      </Container>
    </>
  );
};

export default App;
