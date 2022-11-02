// ============= Test Cases =============
import type { Equal, Expect } from "./test-utils";

interface User {
  name: string;
  age: number;
  address: string;
}

interface UserPartialName {
  name?: string;
  age: number;
  address: string;
}

interface UserPartialNameAndAge {
  name?: string;
  age?: number;
  address: string;
}

type cases = [
  Expect<Equal<PartialByKeys<User, "name">, UserPartialName>>,
  Expect<Equal<PartialByKeys<User, "name" | "unknown">, UserPartialName>>,
  Expect<
    Equal<
      PartialByKeys<User, "name" | "unknown" | "keynotinuser">,
      UserPartialName
    >
  >,
  Expect<Equal<PartialByKeys<User, "name" | "age">, UserPartialNameAndAge>>,
  Expect<Equal<PartialByKeys<User>, Partial<User>>>
];

// ============= Your Code Here =============
type CheckOptions<T, K = keyof T> = {
  [P in Extract<keyof T, K>]?: P extends keyof T ? T[P] : never;
};

type Merge<O> = {
  [I in keyof O]: O[I];
};
// 这里加不加Merge 有什么区别？
type PartialByKeys<T, K extends string | number | symbol = keyof T> = Merge<
  CheckOptions<T, K> & Omit<T, K>
>;
