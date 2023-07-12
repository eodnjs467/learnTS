// 타입을 변수처럼 만드는게 제네릭이다. 함수를 사용할 때 타입이 지정될 수 있도록
// 제한을 시킬 수 있다. extends를 통해 T extends number T는 number 타입에 제한된다.
// 제네릭을 두개 만들 수 있고, 각각 제한을 둘 수 있다.

// class  의 constructor 타입 궁금해하는 사람들이 있는데 이거 확인 해봐야할듯! class 써야하니까? ..

// T extends 예시들
// <T extends {...}>
// <T extends any[]>
// <T extends (...args: any) => any> 함수 모양이다! 콜백함수의 형태를 이런식으로 제한을 시켜놓는다.
// <T extends abstract new (...args: any) => any>

function add<T extends string> (x: T): T { return x; }
add("hello");
function add2<T extends string[]> (x: T): T { return x; }
add2(["1", "2", "3"]);

function add3<T extends (args: string) => number> (x: T): T { return x; }
// 어떤 함수의 형태든 상관 없다 할 땐 any 써도된다 . 왜냐면 제한하는 것이시 때문
const param = (args: string) => { return 3;}
add3(param);

function add4<T extends (...args: any) => any> (x: T): T { return x; }
add4(param);

function add5<T extends abstract new (...args: any) => any> (x: T): T { return x; } // 생성자 넣을 때
class A {}
add5(A);
add5(String);
add5(Array);


// 기본값 타이핑
const a = ({name, age}) => {}
const aa = (info: object) => {}
const aaa = (info: {name: string, age: number} = {name: 'BigOne', age: 27}) => {}
const aaaa = (info= {name: 'BigOne', age: 27}) => {}

// react 사용할 때 <> 때문에 타입스크립트가 오류나는 때가 있다. 이때 타스에 기본값 지정을 해주면 된다.
const b = <T = unknown>(x: T, y: T) => ({ x: y });
b(3,7);
const bb = <T extends unknown>(x: T, y: T) => ({ x: y });
bb(3,7);
const bbb = <T,>(x: T, y: T) => ({ x: y });
bbb(3, 7);

const adddd = <T>(x: T, y: T): T => x + y;

const computer = (data: boolean) => { return !data; }
function power<T extends (args: boolean) => boolean> (info: T) { return info; }

power(computer); // 이거 왜 power(computer(true)) 이런게 안되지? 인자 줘야하는거 아닌가?
