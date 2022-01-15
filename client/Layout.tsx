import { Button } from "ingred-ui";
import React from "react";
import { Link } from "react-router-dom";
import Header from "./components/Header";

export const Layout = (Component: (props?: any) => JSX.Element) => {
    return (props: any) => (
        <div>
            <Header {...props} />
            <Component {...props} />
        </div>
    );
}