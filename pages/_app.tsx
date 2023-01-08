import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { Container, Header } from "components";
import { store, wrapper } from "redux/store";

import "../styles/index.scss";

const App = ({ Component, ...rest }: AppProps) => {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
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
};

export default App;
