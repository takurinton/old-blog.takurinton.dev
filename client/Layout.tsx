import React from "react";
import Header from "./components/Header";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [tagName: string]: any;
    }
  }
}

export const Layout = (Component: (props?: any) => JSX.Element) => {
  return (props: any) => (
    <div>
      <Header {...props} />
      <Component {...props} />
    </div>
  );
};
