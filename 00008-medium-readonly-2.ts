// ============= Test Cases =============
import type { Alike, Expect } from "./test-utils";

type cases = [
  Expect<Alike<MyReadonly2<Todo1>, Readonly<Todo1>>>,
  Expect<Alike<MyReadonly2<Todo1, "title" | "description">, Expected>>,
  Expect<Alike<MyReadonly2<Todo2, "title" | "description">, Expected>>
];

interface Todo1 {
  title: string;
  description?: string;
  completed: boolean;
}

interface Todo2 {
  readonly title: string;
  description?: string;
  completed: boolean;
}

interface Expected {
  readonly title: string;
  readonly description?: string;
  completed: boolean;
}

// ============= Your Code Here =============
// 将 Union K 搞成 readonly
// 想到 {} & {}, 一个是readonly的，一个是剩下的
// 写下👇代码，但是第一个用例不通过，因为第一个用例没有第二个参数【应该把所有属性都搞成readonly】

// 故我们给第二个参数加上一个默认值 keyof T 【默认把所有属性都搞成readonly】
// type MyReadonly2<T, K extends keyof T = keyof T> = {
//   readonly [M in K]: T[M];
// } & {
//   [N in Exclude<keyof T, K>]: T[N];
// };

// 第二种方法，借助我们之前实现的工具类
type MyExclude<T, K> = T extends K ? never : T;
type MyOmit<T, K extends keyof T> = {
  [M in MyExclude<keyof T, K>]: T[M];
};
type MyReadonly2<T, K extends keyof T = keyof T> = {
  readonly [M in K]: T[M];
} & MyOmit<T, K>;
