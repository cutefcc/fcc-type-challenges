// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type cases = [
  Expect<Equal<KebabCase<"FooBarBaz">, "foo-bar-baz">>,
  Expect<Equal<KebabCase<"fooBarBaz">, "foo-bar-baz">>,
  Expect<Equal<KebabCase<"foo-bar">, "foo-bar">>,
  Expect<Equal<KebabCase<"foo_bar">, "foo_bar">>,
  Expect<Equal<KebabCase<"Foo-Bar">, "foo--bar">>,
  Expect<Equal<KebabCase<"ABC">, "a-b-c">>,
  Expect<Equal<KebabCase<"-">, "-">>,
  Expect<Equal<KebabCase<"">, "">>,
  Expect<Equal<KebabCase<"😎">, "😎">>
];

// ============= Your Code Here =============  这题没通过
type Upper = {
  A: "-a";
  B: "-b";
  C: "-c";
  D: "-d";
  E: "-e";
  F: "-f";
  G: "-g";
  H: "-h";
  I: "-i";
  J: "-j";
  K: "-k";
  L: "-l";
  M: "-m";
  N: "-n";
  O: "-o";
  P: "-p";
  Q: "-q";
  R: "-r";
  S: "-s";
  T: "-t";
  U: "-u";
  V: "-v";
  W: "-w";
  X: "-x";
  Y: "-y";
  Z: "-z";
};
type LengthOfString<S extends string, T extends unknown[] = []> = S extends ""
  ? T["length"]
  : S extends `${infer Start}${infer Rest}`
  ? LengthOfString<Rest, [Start, ...T]>
  : never;
type Delete<S extends string> = LengthOfString<S> extends 1
  ? S
  : S extends `-${infer R}`
  ? R
  : S;
type KebabCase<S> = S extends "-"
  ? S
  : S extends `${infer M}${infer E}`
  ? M extends keyof Upper
    ? `${Upper[M]}${KebabCase<E>}`
    : `${M}${KebabCase<E>}`
  : "";
