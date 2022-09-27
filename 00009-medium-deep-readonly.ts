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
// 👇的方案 keyof T extends never  bad case
type DeepReadonly<T> = keyof T extends never
  ? T
  : {
      readonly [M in keyof T]: DeepReadonly<T[M]>;
    };

// ============= Test Cases =============
// keyof T extends never 并不好
type Hmm<T> = keyof T extends never ? true : false;
type X1 = Hmm<{ a: string }>; // false, "a" is a known key
type X2 = Hmm<{}>; // true, there are no known keys
type X3 = Hmm<object>; // true, there are no known keys
type X4 = Hmm<string>; // false, there are keys like "toUpperCase"
type X5 = Hmm<{ a: string } | { b: string }>; // true, unions with no common keys have no known keys

type Z = DeepReadonly<{ a: string } | { b: string }>;
// type Z = {a: string} | {b: string}  OOPS

declare const z: Z;
if ("a" in z) {
  z.a = ""; // no error, not readonly
}
// The "right" definition of DeepReadonly<T> is probably just
type DeepReadonly2<T> = { readonly [K in keyof T]: DeepReadonly2<T[K]> };
type Z1 = DeepReadonly2<{ a: string } | { b: string }>;
type Z2 = DeepReadonly2<{ a: string }>;
// ============= Test Cases =============
