// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<LastIndexOf<[1, 2, 3, 2, 1], 2>, 3>>,
  Expect<Equal<LastIndexOf<[2, 6, 3, 8, 4, 1, 7, 3, 9], 3>, 7>>,
  Expect<Equal<LastIndexOf<[0, 0, 0], 2>, -1>>,
  Expect<Equal<LastIndexOf<[string, 2, number, "a", number, 1], number>, 4>>,
  Expect<Equal<LastIndexOf<[string, any, 1, number, "a", any, 1], any>, 5>>
];
// 反转数组
type Reverse<T extends Array<unknown>> = T extends [infer S, ...infer R]
  ? [...Reverse<R>, S]
  : [];
// 截取给定元素后面的元素 组成一个新数组
type Slice<
  T extends Array<unknown>,
  I,
  M extends Array<unknown> = T
> = T extends [infer S, ...infer R]
  ? Equal<S, I> extends true
    ? M
    : Slice<[...R], I, [...R]>
  : [];

type DD = Slice<[1, 4, 3, 2, 2], 2>;
// ============= Your Code Here =============
type LastIndexOf<
  T extends Array<unknown>,
  U,
  K extends Reverse<T> = Reverse<T>
> = Slice<K, U> extends [infer S, ...infer R] ? R["length"] : -1;
