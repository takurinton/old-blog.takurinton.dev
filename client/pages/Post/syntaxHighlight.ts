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
    r.link = (href: string, title: string, text: string) => {
        // if (window !== undefined) {
        //     const html = (async () => {
        //         try {
        //             const res = await fetch(href, {
        //                 headers: {
        //                     'Content-Type': 'text/html',
        //                 },
        //                 mode: 'no-cors',
        //             });
        //             const text = await res.text();
        //             return new DOMParser().parseFromString(text, "text/html");
        //         } catch {
        //             return new DOMParser().parseFromString('', "text/html");
        //         }
        //     })();

        //     const getMetaTags = (html, m) => {
        //         const metas = html.getElementsByTagName('meta');
        //         for (let i = 0; i < metas.length; i++) {
        //             if (metas[i].getAttribute('name') === m) {
        //                 return metas[i].getAttribute('content');
        //             }
        //         }
        //     }

        //     html.then(h => console.log(getMetaTags(h, 'description')));
        // }

        return `
            <a href="${href}" target="_blank">${text}</a>
        `
    }
    return r;
};