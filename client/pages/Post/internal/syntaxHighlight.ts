import { marked } from "marked";

export const markdownStyle = () => {
  const r = new marked.Renderer();
  r.heading = (text: string, level: number) => {
    if (level === 1) {
      return `<h${level} class="h${level}" style="border-bottom: 2px solid #ff69b4; padding-bottom: 5px">${text}</h${level}>`;
    }
    return `<h${level} class="h${level}">${text}</h${level}>`;
  };
  r.table = (header: string, body: string) => {
    return `
      <table class="table" border="1" width="100%">
        ${header}
        ${body}
      </table>
    `;
  };
  r.list = (body: string, ordered: boolean, start: number) => {
    if (ordered) {
      return `
        <ul style='padding-left: ${start}'>
            ${body}
        </ul>
      `;
    }
    return `
      <ul>
          ${body}
      </ul>
    `;
  };
  r.image = (href: string | null, title: string | null, text: string) => {
    return `
      <img src=${href} alt=${text} class="content-img ${title ?? ""}" />
    `;
  };
  r.paragraph = (text: string) => {
    return `
      <p class="p">${text}</p>
    `;
  };
  r.link = (href: string, title: string, text: string) => {
    return `
      <a href="${href}" target="_blank" class=${title}>${text}</a>
      <x-link link="${href}"></x-link>
    `;
  };
  r.blockquote = (quote: string) => {
    return `<blockquote style="border-left:3px solid gray;margin:0 0 0 10px;padding-left:20px;color:gray;">${quote}</blockquote>`;
  };
  return r;
};
