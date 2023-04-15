
export const BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : "https://talk-loop.vercel.app";

console.log('BASE_URL', BASE_URL)