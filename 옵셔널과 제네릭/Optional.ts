//옵셔널 (?)
function abc(a: number, b?: number, c?: number) { }

abc(1);
abc(1, 2);
abc(1, 2, 3);
abc(1, 2, 3, 4); // error

function abc2(...args: number[]) { }
abc2(1);
abc2(1, 2);

let obj: {a: string, b?: string} = { a: 'hello', b: 'world' }
obj = { a: 'hello' };
let obj2: { [key: string]: string }
obj2 = { hello: 'world' };
