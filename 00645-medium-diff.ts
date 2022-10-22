// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

type Foo = {
  name: string;
  age: string;
};
type Bar = {
  name: string;
  age: string;
  gender: number;
};
type Coo = {
  name: string;
  gender: number;
};

type cases = [
  Expect<Equal<Diff<Foo, Bar>, { gender: number }>>,
  Expect<Equal<Diff<Bar, Foo>, { gender: number }>>,
  Expect<Equal<Diff<Foo, Coo>, { age: string; gender: number }>>,
  Expect<Equal<Diff<Coo, Foo>, { age: string; gender: number }>>
];

// ============= Your Code Here =============
type Diff<O, O1, K extends keyof O = keyof O, M extends keyof O1 = keyof O1> = {
  [N in Exclude<K, M> | Exclude<M, K>]: N extends Exclude<K, M>
    ? O[N]
    : N extends Exclude<M, K>
    ? O1[N]
    : never;
};
