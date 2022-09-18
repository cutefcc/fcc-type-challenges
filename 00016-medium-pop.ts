// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Pop<[3, 2, 1]>, [3, 2]>>,
  Expect<Equal<Pop<["a", "b", "c", "d"]>, ["a", "b", "c"]>>
];

// ============= Your Code Here =============
// JS 不支持将 rest 参数定义在前面，但是 TS 支持，那么通过将前面的参数都定义为 rest，最后一位定义为 last，这样就能够拿到前面的数组了
type Pop<T extends any[]> = T extends [...infer R, any] ? R : never;
