"use client";

import apollo from "@/lib/apollo/client";
import { ApolloProvider } from "@apollo/client";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";
import Popup from "./Popup/Popup";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

interface ProvidersProps extends PropsWithChildren {}

const Providers = ({ children }: ProvidersProps) => {
  return (
    <SessionProvider>
      <ApolloProvider client={apollo}>
        <Provider store={store}>
          <Popup />
          {children}
        </Provider>
      </ApolloProvider>
    </SessionProvider>
  );
};

export default Providers;
