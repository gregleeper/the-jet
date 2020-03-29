import React from "react";
import App from "next/app";
import "../css/tailwind.css";
const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
