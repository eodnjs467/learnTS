interface Array<T> {
  // forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
}

const numArr = [1, 2, 3, 4];

/**
 *  타입 분석, 타입 만들기
 *  타입스크립트에서 제네릭으로 이루어진 타입들에대해 분석한다.
 *  자바스크립트에서 사용가능한 메서드들이 타입스크립트로 어떻게 구성되어있을지 생각하면서 직접 타입을 정의해본다.
 */


// 타입분석
interface Array<T>{
  forEach(callback: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
  map<U>(callback: (value: T, index: number, array: T[]) => U[], thisArgs?: any): U[];
  filter<S extends T>(predicate: (value: T, index: number, array: T[]) => value is S, thisArgs?: any): S[];
  split(separator: string | RegExp, limit?: number): string[];
}
const predicate = (value: string | number): value is string => typeof value === 'string';
const filtered = ['1', 2, '3', 4, '5'].filter(predicate);

interface Arr<T>{
  forEach(callback: (item: T) => void): void;
}



// 타입 직접 만들기
const a: Arr<number> = [3, 4, 5];
const b: Arr<string> = ['3', '4', '5'];


