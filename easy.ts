export type MyPick<T, K extends keyof T> = {
    [P in K]: T[P];
};

export type NOfArray<ArrayObj extends any[], N extends number> = ArrayObj[N];

export type Unshift<ArrayType extends any[], Element> = [Element, ...ArrayType];

export type MyExclude<T, U> = T extends U ? never : T;

// MyPrick example
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}
  
type TodoPreview = MyPick<Todo, 'title' | 'completed'>;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};

//NOfArray example
type MyArray = [string, number, boolean];
type SecondElementType = NOfArray<MyArray, 1>;
const test: SecondElementType = 1; // typeof test == number

//Unshift example
type OriginalArray = [number, string];
type NewArray = Unshift<OriginalArray, boolean>;  // [boolean, number, string]
let testArray: NewArray = [true, 1, "a"];

// MyExclude example
type a = "a" | "b" | "c";
type b = "b" | "c" | "d";
type c = MyExclude<a, b>; // a