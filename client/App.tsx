import React from "react";
import { Routes, Route } from "react-router-dom";
import { About } from "./pages/About";
import { Home } from "./pages/Home";
import { Post } from "./pages/Post";

export const App: React.FC<{ props: any }> = ({ props }): JSX.Element => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home props={props} />} />
                <Route path="/post/:id" element={<Post props={props} />} />
                <Route path="about" element={<About />} />
            </Routes>
        </>
    )
}