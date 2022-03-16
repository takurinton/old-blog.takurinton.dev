export class Category extends HTMLElement {
  constructor() {
    super();
    const shadow = document.createElement("span");
    this.attachShadow({ mode: "open" }).appendChild(shadow);
    const text = this.getAttribute("text");
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
  }
}
