import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Container, Header } from "@components";
import { store } from "@redux/store";

import "../styles/index.scss";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Container>
        <Header />
        <Provider store={store}>
          {" "}
          <Component {...pageProps} />
        </Provider>
      </Container>
    </>
  );
}
