import type { AppProps } from "next/app";
import { Container, Header } from "components";

import "../styles/index.scss";
import useAuthStore from "store/auth";
import { useEffect } from "react";

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
