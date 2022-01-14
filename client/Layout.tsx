import React from "react";
import { Link } from "react-router-dom";

export const Layout = (Component: (props?: any) => JSX.Element) => {
    return (props: any) => (
        <div>
            {/* TODO: add Header component */}
            {/* <Header /> */}
            <p><Link to="/">home</Link></p>
            <p><Link to="/about">about</Link></p>
            <Component {...props} />
        </div>
    );
}