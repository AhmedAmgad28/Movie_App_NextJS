import "@component/styles/globals.css";
import NavBar from "@component/Components/NavBar"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from "react";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps:{session,...pageProps} }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.min.js");
  }, []);

  if (Component.getLayout)
    return Component.getLayout(<Component {...pageProps} />);
  else {
    return (
      <>
      <SessionProvider session={session}>
        <NavBar></NavBar>
        <Component {...pageProps} />
      </SessionProvider>
    </>
    );
  }
}
