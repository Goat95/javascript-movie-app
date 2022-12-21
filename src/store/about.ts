import { Store } from "../core/core";

interface State {
  photo: string;
  name: string;
  email: string;
  blog: string;
  github: string;
  repository: string;
}

export default new Store<State>({
  photo: "https://heropy.blog/css/images/logo.png",
  name: "GOAT95 / KimJunHyeok",
  email: "goat95@naver.com",
  blog: "https://heropy.blog",
  github: "https://github.com/Goat95",
  repository: "https://github.com/Goat95",
});
