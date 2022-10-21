// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<LengthOfString<"">, 0>>,
  Expect<Equal<LengthOfString<"kumiko">, 6>>,
  Expect<Equal<LengthOfString<"reina">, 5>>,
  Expect<Equal<LengthOfString<"Sound! Euphonium">, 16>>
];

// ============= Your Code Here =============
// 数组可以T['length'] 取得长度，而 string 类型去到的是一个 number 去不到特定的值
// 考察递归 + 模版字符串 + 数组T['length'] 取得长度
type LengthOfString<S extends string, T extends unknown[] = []> = S extends ""
  ? T["length"]
  : S extends `${infer Start}${infer Rest}`
  ? LengthOfString<Rest, [Start, ...T]>
  : never;
