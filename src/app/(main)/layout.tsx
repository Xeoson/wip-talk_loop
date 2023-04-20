import Providers from "@/components/common/Providers";
import { getServerSession } from "next-auth";
import { Ubuntu } from "next/font/google";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
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

  return (
    <html lang="en">
      <body
        className={`bg-cyan-900 text-neutral-300/95 flex items-center justify-center ${MainFont.className}`}
      >
        <Providers session={session!}>{children}</Providers>
      </body>
    </html>
  );
}
