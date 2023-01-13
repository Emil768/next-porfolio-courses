import type { AppProps } from "next/app";
import { Container, Header } from "components";

import "../styles/index.scss";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Container>
        <Header /> <Component {...pageProps} />
      </Container>
    </>
  );
};

export default App;
