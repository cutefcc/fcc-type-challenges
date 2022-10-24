// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<IsNever<never>, true>>,
  Expect<Equal<IsNever<never | string>, false>>,
  Expect<Equal<IsNever<"">, false>>,
  Expect<Equal<IsNever<undefined>, false>>,
  Expect<Equal<IsNever<null>, false>>,
  Expect<Equal<IsNever<[]>, false>>,
  Expect<Equal<IsNever<{}>, false>>
];

// ============= Your Code Here =============
// type IsNever<T> = T extends never ? true : false;// 这样不行的
// 思路：never 在泛型中的特殊性，它不会触发 extends 判断，而是直接终结，致使判断无效。
//      而解法也很简单，只要绕过 never 这个特性即可，包一个数组：
type IsNever<T> = [T] extends [never] ? true : false;
