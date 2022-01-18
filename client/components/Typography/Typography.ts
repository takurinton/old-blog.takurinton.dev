// const fontSize = {
//     h1: '2rem',
//     h2: '1.6rem',
//     h3: '1.2rem',
//     p: '1rem',
// }

// export class Typography extends HTMLElement {
//     constructor() {
//         super();
//         const tag = this.getAttribute('tag');
//         const shadow = document.createElement(tag);
//         const weight = this.getAttribute('weight');
//         const text = this.getAttribute('text');

//         shadow.innerHTML = `
//             <style>
//                 span {
//                     font-size: ${fontSize[tag]};
//                     color: #222222;
//                     font-weight: ${weight === 'bold' ? 800 : 200};
//                 }
//             </style>

//             <span>${text}</span>
//         `;

//         this.attachShadow({ mode: 'open' }).appendChild(shadow);
//     }
// }
