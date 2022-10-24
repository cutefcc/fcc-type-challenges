// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Without<[1, 2], 1>, [2]>>,
  Expect<Equal<Without<[1, 2, 4, 1, 5], [1, 2]>, [4, 5]>>,
  Expect<Equal<Without<[2, 3, 2, 3, 2, 3, 2, 3], [2, 3]>, []>>
];
// 判断T 是否 在U 里面
type MyInArray<T, U extends Array<unknown> | unknown> = U extends Array<unknown>
  ? U extends [infer S, ...infer R]
    ? T extends S
      ? true
      : MyInArray<T, R>
    : false
  : T extends U
  ? true
  : false;
// ============= Your Code Here =============
type Without<
  T extends Array<unknown>,
  U extends Array<unknown> | unknown
> = T extends [infer S, ...infer R]
  ? MyInArray<S, U> extends true
    ? Without<R, U>
    : [S, ...Without<R, U>]
  : [];
