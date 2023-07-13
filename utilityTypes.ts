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


















































