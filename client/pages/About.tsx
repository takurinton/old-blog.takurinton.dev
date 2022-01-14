import React, { useState } from "react";
import { Layout } from "../Layout";

export const About: React.FC = Layout(() => {
    const [count, setCount] = useState(0);

    return (
        <div>
            about page
            <p>{count}</p>
            <button onClick={() => setCount(c => c + 1)}>click</button>
        </div>
    )
})