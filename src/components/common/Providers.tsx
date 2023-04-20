"use client";

import apollo from "@/lib/apollo/client";
import { store } from "@/redux/store";
import { ApolloProvider } from "@apollo/client";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import Popup from "./Popup/Popup";
import { BASE_URL } from "@/common/const";

interface ProvidersProps extends PropsWithChildren {
  session: Session;
}

const Providers = ({ children, session }: ProvidersProps) => {
  return (
    <SessionProvider session={session}>
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
