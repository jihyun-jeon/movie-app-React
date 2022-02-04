/*Typescript에는 module을 declare module을 이용하여 extend하는 방법이 존재한다.
해당 방법을 이용하면 코드가 합쳐지는데 Style Components 에서 제공되는 
ThemeProvider를 활용하기 위해서 interface를 추가해주는 것이다.
*/

import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
  }
}

/* 질문1) 작동원리 <ambient declaration> : 타입스크립트 app파일 자체에 모듈을 선언하는게 아니라, 전역에 알리는 것임.
1. 기존에 styled-components 안에있는 DefaultTheme는 {}빈객체인데 새로운 객체로 덮어씌우는 것임. 새로운 인터페이스가 생기는 것임.
2. declare module : 이런 타입스크립트 모듈이 있다는 것을 전역에 선언하는 것임.
3. 형식: declare module "모듈이름" {export 모듈안에 있는 타입형식}
*/

/*
<ambient declaration> 주변선언
: movieApp 안에서만 국한된게 아니라, 이 폴더 전체에서,"전역에 타입 선언"하는거.
: 형식 : declare module 모듈명{} <-모듈 내부에 있는 타입을 덮어쓰거나 지정할 수 있음.
: d.ts 형식으로 파일명을 써야 불필요하게 js파일로 트랜스파일 하지 않게됨. (ts파일,js파일 두개 만들어지지 않게 됨.)
  ㄴ>d.ts는 실체가 안생기는 파일임 :타입만 지정하는거고 js처럼 렌더하는게 없다는 뜻.
*/
