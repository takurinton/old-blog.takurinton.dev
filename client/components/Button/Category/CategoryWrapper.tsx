import React, { forwardRef, useRef, useEffect } from "react";

type CategoryProps = {
    text: string;
}

export const CategoryWrapper = forwardRef<HTMLSpanElement, CategoryProps>(({ text }, ref) => {
    const categoryRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const shadow = document.createElement('span');
        shadow.innerHTML = `
            <style>
                span {
                    padding: 5px 10px 6px;
                    background: #707070;
                    color: white;
                    text-decoration: none;
                    border-radius: 2px;
                    font-weight: 800;
                }
                
                span:hover {
                    background: #ff69b4;
                }
            </style>

            <span>${text}</span>
        `;

        categoryRef.current?.attachShadow({ mode: 'open' }).appendChild(shadow);
    }, []);

    return (
        <span ref={categoryRef}>
            <span slot="category-content">{text}</span>
        </span>
    )
})
