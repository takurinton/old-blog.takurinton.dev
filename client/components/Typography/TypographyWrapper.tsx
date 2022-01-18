import React, { forwardRef, useRef, useEffect } from "react";

const fontSize = {
    h1: '2rem',
    h2: '1.6rem',
    h3: '1.2rem',
    p: '1rem',
}

type TypographyProps = {
    tag: 'h1' | 'h2' | 'h3' | 'p';
    weight?: 'bold' | 'normal',
    text: string;
    hover?: boolean;
    style?: { [key: string]: string }
}

// 一応 forwardRef
export const TypographyWrapper = forwardRef<HTMLSpanElement, TypographyProps>(({
    tag,
    weight = 'normal',
    text,
    hover,
    // style
}, ref) => {
    const typographyRef = useRef<HTMLHeadingElement>(null);

    useEffect(() => {
        const shadow = document.createElement(tag);
        shadow.innerHTML = `
            <style>
                ${tag} {
                    font-size: ${fontSize[tag]};
                    color: #222222;
                    font-weight: ${weight === 'bold' ? 800 : 200};
                }
                
            </style>

            ${text}
        `;

        typographyRef.current?.attachShadow({ mode: 'open' }).appendChild(shadow);
    }, []);

    return (
        <span ref={typographyRef}>
            <span slot="typography-content">{text}</span>
        </span>
    )
})
