/**
 * Partial<Type>
 *   타입의 모든 프로퍼티들을 선택사항으로 설정된 타입을 생성합니다.
 */
interface Todo {
  title: string;
  description: string;
}
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>){
  return {...todo, ...fieldsToUpdate};
}

const todo1 = {
  title: 'typescript',
  description: 'type',
}

const todo2 = updateTodo(todo1, {title: 'javascript'});

// 직접 타입 만들어보기
type P<T> = { [P in keyof T]?: T[P] };
// 원본
type Partial<T> = {
  [P in keyof T]?: T[P];
};
// 느낀점: [key in T] 이렇게 생각했는데 음 .. in과 keyof의 역할을 정확히 알아야겠다. keyof는 그냥 키로 내줄 뿐 in은 전부다 반복인가?
// keyof 는 키값만 추출 in은 존재여부 맵드타입스는 반복해주는건가? ㅇㅇ 맞아 map과 같은 효과

type Ex = string | number;
const ex: Ex = 'hi';
const ex2: Ex = 3;

/**
 * Required<Type>
 *   타입의 모든 프로퍼티들을 필수사항으로 설정된 타입을 생성합니다.
 */
interface Props {
  a?: number;
  b?: string;
  c?: boolean;
}

const obj: Props = { a: 3 };
const obj2: Required<Props> = { a: 3 };   // error

/**
 * Awaited<Type>
 *   비동기 함수의 await, promise의 then() 메서드, 프로미스를 재귀적으로 언래핑합니다.
 */
type A = Awaited<Promise<string>>; // type A = string
type B = Awaited<Promise<Promise<number>>>; // type B = number;
type C = Awaited<boolean | Promise<number>>; // typeC = boolean | number;

const aa: A = Promise.resolve(3); // '3' ? 이 나오나?

/**
 * Readonly<Type>
 *   타입의 모든 프로퍼티를 readonly 속성으로 설정된 타입을 생성합니다.
 */
interface Book{
  title: string;
  author: string;
}

const book: Readonly<Book> = { title: 'King', author: 'bigOne' };
book.title = 'health'; // error: const 또는 readonly 변수에 할당을 시도합니다

/**
 * Record<Keys, Type>
 *   객체의 프로퍼티 명이 Keys가 되고 , 객체 프로퍼티 값을 Type으로 지정합니다.
 *   아래와 같이 맵드타입스와, 인덱스드 시그니처를 통해 쉽게 적용이 가능합니다.
 */
interface CatInfo {
  age: number;
  breed: string;
}

type CatName = 'miffy' | 'boris' | 'mordred';

const cats: { [key in CatName]: CatInfo} = {
  miffy: {age: 10, breed: 'Persion'},
  boris: {age: 10, breed: 'Persion'},
  mordred: {age: 10, breed: 'Persion'},
}

/**
 * Pick<Type, Keys>
 *   Type에서 원하는 Keys만 골라 타입을 생성합니다.
 */

interface Training {
  muscle: number;
  rm1: number;
  completed: boolean;
}

type SmallTraining = Pick<Training, "completed" | "muscle">;
const trainer: SmallTraining = {
  completed: true,
  muscle: 37
}

/**
 * Omit<Type, Keys>
 *   Type 의 프로퍼티들 중 제외할 Keys 를 골라 제거한 타입을 생성합니다.
 */

interface Person {
  name: string,
  age: number,
  hobby: string[],
  company: string,
}

type JoblessPerson = Omit<Person, "company">;

type NoHobbyPerson = Omit<Person, "hobby" | "company">;

const jobless: JoblessPerson = {
  name: 'sang chul Baek',
  age: 35,
  hobby: ['sleep', 'game'],
}

const noHobby: NoHobbyPerson = {
  name: 'eun jung An',
  age: 31,
}

/**
 * Exclude<UnionType, ExcludeMembers>
 *   UnionType 에서 제외할 멤버(ExcludeMembers) 를 지정하면 제외된 유니언타입을 생성합니다.
 */

type T0 = Exclude<"a" | "b" | "c" | "d" | "e" | "f", "a">;
type T1 = Exclude<T0, "b" | "c">;
type T2 = Exclude<string | number | (() => void), Function>
type Shape =
    | { kind: 'circle', radius: number }
    | { kind: 'square', x: number }
    | { kind: 'triangle', x: number, y: number };
type T3 = Exclude<Shape, { kind: 'circle' }>

const t: T3 = {kind: "square", x: 50};

/**
 * Extract<Type, Union>
 *   Type 중에 Union에 할당할 수 있는 모든 Union 멤버를 추출하여 생성합니다.
 *   즉, 교집합!
 */

type E0 = Extract<"a" | "b" | "c", "a" | "f">; // type E0 = "a"
type E1 = Extract<string | number | (() => void), Function>;
//type Shape 는 위에 작성된 것 이용
type E2 = Extract<Shape, { kind: 'circle' }> // type E2 = { kind: 'circle', radius: 3 }
const ee: E2 = {
  kind: 'circle',
  radius: 3,
}

/**
 * NonNullable<Type>
 *   Type 에서 null, undefined 를 제외합니다.
 */

type N0 = NonNullable<string | number | undefined>; // type N0 = string | number;
type N1 = NonNullable<string[] | number [] | null | undefined>; // type N1 = string[], number[]


/**
 * Parameters<Type>
 *   Type 에서 함수의 매개변수의 타입을 튜플로 생성합니다.
 */

declare function p1(arg: { a: number; b: string }): void;

type P0 = Parameters<() => string>;   // type P0 = []
type P1 = Parameters<(s: string) => void>; // type P1 = [string]
type P2 = Parameters<<T>(arg: T) => T>; // type P2 = [T: unknown]
type P3 = Parameters<typeof p1>;    // type P3 = [{number, string}]
type P4 = Parameters<any>;
type P5 = Parameters<never>;
type P6 = Parameters<string>;
type P7 = Parameters<Function>;

/**
 * ReturnType<Type>
 *   Type 의 반환 값을 타입으로 생성합니다.
 */

declare function f1(): { a: number; b: string };

type F0 = ReturnType<() => string>      // type F0 = string
type F1 = ReturnType<(s: string) => void> // type F1 = void
type F2 = ReturnType<<T>() => T>;       // type F2 = T: unknown
type F3 = ReturnType<<T extends U, U extends number[]>() => T>  // type F3 = number[]
type F4 = ReturnType<typeof f1>;        // type F4 = { a: number, b: string }
function zip (x: number, y: string): {x: number, y: string} { return {x, y} }

// 리턴 구현
type R<T extends (...args: any) => any> = T extends (...args: any) => infer A ? A : never;














