import { atom } from "recoil";

const initialPostsState = {
  current: 0,
  next: 0,
  preview: 0,
  category: "",
  results: [
    {
      id: 0,
      title: "",
      contents: "",
      category: "",
      pub_date: "",
    },
  ],
};

const initialPostState = [];

const initialExternalLinksState = [
  {
    icon: "",
    title: "",
    url: "",
    content: "",
    date: "",
  },
];

export const postsState = atom({
  key: "posts",
  default: initialPostsState,
});

export const postState = atom({
  key: "post",
  default: initialPostState,
});

export const externalLinksState = atom({
  key: "external",
  default: [],
});
