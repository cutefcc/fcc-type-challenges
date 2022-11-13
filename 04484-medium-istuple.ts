// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<IsTuple<[]>, true>>,
  Expect<Equal<IsTuple<[number]>, true>>,
  Expect<Equal<IsTuple<readonly [1]>, true>>,
  Expect<Equal<IsTuple<{ length: 1 }>, false>>,
  Expect<Equal<IsTuple<number[]>, false>>,
  Expect<Equal<IsTuple<never>, false>>
];

// ============= Your Code Here =============
type IsTuple<T> = [T] extends [never]
  ? false
  : T extends readonly any[]
  ? number extends T["length"]
    ? false
    : true
  : false;
// 排除never 用 [T] extends [never] ? :

// number is just a type (const x: number = 1). To be a tuple, T['length'] needs to exact number type (1, 2, 42, etc) and not just number type. Exact number extends number and number does not extends exact number but extends itself. So we can check if T['length'] is exact number or not by checking if number extends T['length'] or not

// for T['length']: number

// = number extends T['lenght']
// = number extends number
// = true
// for T['length']: 1 or any exact number

// = number extends T['lenght']
// = number extends 1
// = false
