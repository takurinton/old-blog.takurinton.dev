import { atom } from "recoil";

export const initialState = [
  {
    icon: "",
    title: "",
    url: "",
    content: "",
  },
];

export const externalLinksState = atom({
  key: "external",
  default: initialState,
});
