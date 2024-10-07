// heler type
type CamelizeParam<T> = T extends `${infer firstPart}_${infer secondPart}` ? `${firstPart}${Capitalize<CamelizeParam<secondPart>>}` : T;

export type Camelize<ObjectType> = ObjectType extends object ? 
{[K in keyof ObjectType as CamelizeParam<K>]: Camelize<ObjectType[K]>}
: ObjectType;

// did not get this, i guess it means like "param1.param2"?
export type DeepPick<T, Paths> = Paths extends `${infer param}.${infer innerParam}` ? 
(param extends keyof T ? {[key in param]: DeepPick<T[param], innerParam>} : never) : 
(Paths extends keyof T ? {[key in Paths]: T[key]} : never);

//Camelize example
type snake = "hello_world";
type camel = Camelize<snake>; // helloWorld

//DeepPick example
interface Todo {
    title: string;
    description: string;
    completed: boolean;
    meta: {
      author: string;
      views: number;
      param: {
        another_param: string;
      };
    };
}

type deep = DeepPick<Todo, "title" | "meta.author" | "meta.param.another_param">;