export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type MyCapitalize<T extends string> = T extends `${infer FirstLetter}${infer Rest}` ? `${Uppercase<FirstLetter>}${Rest}` : T;

export type DeepMutable<T> = {
    -readonly [P in keyof T]: T[P] extends object ? DeepMutable<T[P]> : T[P];
};

export type ParseURLParams<StringElem extends string> = StringElem extends `${infer Start}${infer Param}${infer Rest}` ? 
(Param | ParseURLParams<Rest>) : 
(StringElem extends `${infer Start}${infer Param}` ? Param : never);

//Deep Partial example
interface Todo {
    readonly title: string;
    readonly description: string;
    readonly completed: boolean;
    readonly meta: {
      readonly author: string;
      readonly views: number;
    };
  }
  
  type PartialTodo = DeepPartial<Todo>;
  
  const todo: PartialTodo = {
    title: "Learn TypeScript",
    meta: {
      views: 100
    }
  };
  
// MyCapitalize example
type lower = "hello";
type capitalized = MyCapitalize<lower>;  // 'Hello'

// DeepMutalbe example
type MutableTodo = DeepMutable<Todo>; // all keys are mutable

// ParseURLParams
type Params = ParseURLParams<'posts/:id/:user'>;  // 'id' | 'user'
type NoParams = ParseURLParams<'posts/id'>;  // never