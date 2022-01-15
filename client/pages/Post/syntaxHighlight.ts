import { marked } from 'marked';

export const markdownStyle = () => {
    const r = new marked.Renderer();
    r.heading = (text: string, level: number) => {
        if (level === 1) {
            return `<h${level} class="h${level}" style="border-bottom: 2px solid #ff69b4; padding-bottom: 5px">${text}</h${level}>`;
        }
        return `<h${level} class="h${level}">${text}</h${level}>`;
    };
    r.table = (header: string, body: string) => {
        return `<table class="table" border="1" width="100%">
                    ${header}
                    ${body}
                </table>`;
    };
    r.list = (body: string, ordered: boolean, start: number) => {
        return `
                <ul>
                    ${body}
                </ul>
                `;
    };
    r.image = (href: string | null, title: string | null, text: string) => {
        return `
                <img src=${href} class="content-img" />
                `;
    };
    r.paragraph = (text: string) => {
        return `
                <p class="p">${text}</p>
                `;
    };
    return r;
};