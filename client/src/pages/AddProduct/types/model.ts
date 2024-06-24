import { sample } from "effector";
import { addProductFx } from "../../../shared/posts";

sample({
  clock: addProductFx,
  fn: (product) => product,
  target: addProductFx
});
