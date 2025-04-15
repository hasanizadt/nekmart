import "@/styles/globals.css";
import { Provider } from "urql";

//Urql
import { useClient } from "@/Urql/client";

//Fonts
import { open_sans } from "@/Fonts";

const App = ({
  Component,
  pageProps
}) => {
  const client = useClient(pageProps);
  return (
    <Provider value={client}>
      <style jsx global>{`
        html {
          font-family: ${open_sans.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
