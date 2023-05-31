import React from "react";
import "@styles/globals.css";
// import Provider from '@components/Provider';
import Nav from "../components/Nav";
import Provider from "../components/Provider";

export const metadata = {
  title: "Demo App",
  description: "Discover & share Thoughts",
};
const RootLayout = ({ children }) => {
  return (
    <html>
      <body>
        <Provider>
          <div className="main">
            <div className="gardient" />
          </div>
          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
