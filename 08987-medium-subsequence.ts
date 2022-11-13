// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<Subsequence<[1, 2]>, [] | [1] | [2] | [1, 2]>>,
  Expect<
    Equal<
      Subsequence<[1, 2, 3]>,
      [] | [1] | [2] | [1, 2] | [3] | [1, 3] | [2, 3] | [1, 2, 3]
    >
  >
];

// ============= Your Code Here =============
// type Subsequence<T extends any[]> = any
type Subsequence<T extends any[], Prefix extends any[] = []> = T extends [
  infer F,
  ...infer R
]
  ? Subsequence<R, Prefix | [...Prefix, F]>
  : Prefix;

// 利用了如下原理
type A = [] | [1] | [1, 2, 3];
type B = [...A, 4]; // type B = [4] | [1, 4] | [1, 2, 3, 4]
