import React from "react";
import ReactDOM from "react-dom";
import Practice from "./practice";
import StyledComponent from "./styledComponent";
import AniApp from "./aniApp";

ReactDOM.render(
  <React.StrictMode>
    {/*AniApp안에 있는 모든 컴포넌틀들이 이 theme obj의 프로퍼티에 접근할 수 있음.  */}
    <AniApp />
    {/* <Practice /> */}
    {/* <StyledComponent /> */}
  </React.StrictMode>,
  document.getElementById("root")
);

/*
// : void <- 리턴값의 유형도 지정해줌, (void는 리턴값이 없을때, 공백을 의미)
// const sayHi1 = (name: string, age: number, gender: string): string => {
//   return `${name}${age}${gender}`;
// };

// console.log(sayHi1("jihyun", 21, "fe"));


// interface : person 객체가 이 Human 인터페이스와 같은 구조를 이루고 있는지 확인시켜줌
interface Human {
  name: string;
  age: number;
  gender: string;
}

const person = { name: "jihyun", age: 23, gender: "fe" };

const sayHi2 = (person: Human): string => {
  return `${person.name}${person.age}${person.gender}`;
};

console.log(sayHi2(person)); //함수를 실행할때 인자로 객체를 넘겨줌

export {};
*/
