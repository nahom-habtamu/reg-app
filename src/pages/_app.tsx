import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        <Component {...pageProps} />
        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
}
