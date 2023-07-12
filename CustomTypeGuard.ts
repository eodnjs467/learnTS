const promise1 = Promise.resolve(3);
const promise2 = Promise.resolve(4);
const promise3 = Promise.reject('거절합니다');
const promises = [promise1, promise2, promise3];
const isResult = (input: PromiseSettledResult<unknown>): input is PromiseRejectedResult => input.status === 'rejected';

const result = await Promise.allSettled(promises);

const errors = result.filter(isResult);
console.log(result);
console.log(errors);

const a: unknown = 'hello 모든 타입 가능!';
if(a) {
  a;  // if문에서 null, undefined가 올 수 없으니 a 는 {}로 추론된다.
}else{
  a;  // if문에서 {} 을 비교했으니 그게 아닌 unknown이다.
}


const abc = {
  "a": "dsadsa",
}
const aaa = JSON.parse('abc');
aaa.forEach();
const b = (b?: number) => {}
