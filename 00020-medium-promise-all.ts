// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

const promiseAllTest1 = PromiseAll([1, 2, 3] as const);
const promiseAllTest2 = PromiseAll([1, 2, Promise.resolve(3)] as const);
const promiseAllTest3 = PromiseAll([1, 2, Promise.resolve(3)]);

type cases = [
  Expect<Equal<typeof promiseAllTest1, Promise<[1, 2, 3]>>>,
  Expect<Equal<typeof promiseAllTest2, Promise<[1, 2, number]>>>,
  Expect<Equal<typeof promiseAllTest3, Promise<[number, number, number]>>>
];

// ============= Your Code Here =============
// https://medium.com/@ugursalin/30-day-typescript-type-challenge-challenge-22-9205d7f4bf8e
// 如果不加readonly ，会报错
// 类型“readonly [1, 2, 3]”的参数不能赋给类型“[1, 2, 3]”的参数。
//   类型 "readonly [1, 2, 3]" 为 "readonly"，不能分配给可变类型 "[1, 2, 3]"。
declare function PromiseAll<T extends unknown[]>(
  values: readonly [...T]
): Promise<{
  [K in keyof T]: T[K] extends Promise<infer R> ? R : T[K];
}>;
