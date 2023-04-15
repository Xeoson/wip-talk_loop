import Providers from "@/components/common/Providers";
import { getServerSession } from "next-auth";
import { Ubuntu } from "next/font/google";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import browserRoutes from "../../common/browserRoutes";
import { authOptions } from "../api/auth/[...nextauth]/route";
import "../globals.scss";

export const metadata = {
  title: "Talk Loop",
  description: "Chat App",
};

const MainFont = Ubuntu({
  style: ["italic", "normal"],
  weight: ["300", "400", "700"],
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  const headersInst = headers();
  if (!session && headersInst.get("x-invoke-path") !== browserRoutes.login) {
    redirect(browserRoutes.login);
  } else if (
    session &&
    headersInst.get("x-invoke-path") == browserRoutes.login
  ) {
    redirect(browserRoutes.index);
  }

  return (
    <html lang="en">
      <body
        className={`bg-cyan-900 text-neutral-300/95 flex items-center justify-center ${MainFont.className}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
