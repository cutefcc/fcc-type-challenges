// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [Expect<Equal<DeepReadonly<X>, Expected>>];

type X = {
  a: () => 22;
  b: string;
  c: {
    d: boolean;
    e: {
      g: {
        h: {
          i: true;
          j: "string";
        };
        k: "hello";
      };
      l: [
        "hi",
        {
          m: ["hey"];
        }
      ];
    };
  };
};

type Expected = {
  readonly a: () => 22;
  readonly b: string;
  readonly c: {
    readonly d: boolean;
    readonly e: {
      readonly g: {
        readonly h: {
          readonly i: true;
          readonly j: "string";
        };
        readonly k: "hello";
      };
      readonly l: readonly [
        "hi",
        {
          readonly m: readonly ["hey"];
        }
      ];
    };
  };
};

// ============= Your Code Here =============
// deep 就想到 递归，遇到对象和数组就递归，但是没想出解决方案
// 👇的方案很巧妙，通过 keyof T extends never 来判断是否是对象，如果是对象就递归，如果不是就直接返回
type DeepReadonly<T> = keyof T extends never
  ? T
  : {
      readonly [M in keyof T]: DeepReadonly<T[M]>;
    };
