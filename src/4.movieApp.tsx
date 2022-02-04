import { createGlobalStyle } from "styled-components";
import Router from "./3.Router";
import { ReactQueryDevtools } from "react-query/devtools";

//createGlobalStyle: 컴포넌트를 만드는데, 컴포넌트가 렌더링 될때 "전역 스코프에 스타일"을 적용해줌.
//기본css를 리셋시키는 소스: https://github.com/zacanger/styled-reset/blob/master/src/index.ts
const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
// 앱의 기본 스타일 직접 지정해줌.
*{
  box-sizing: border-box; 
  //content-box: width와 height 속성이 컨텐트 내용부분에만 적용되는데, 
   //box-sizing: width와 height 속성이 컨텐트 내용부분뿐 아니라 테두리영역까지 적용됨.
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color: ${(prop) => (prop.theme as any).bgColor};
  color:  ${(prop) => (prop.theme as any).textColor};
}
a {
  text-decoration:none;
  color: inherit;
}
`;

function MovieApp() {
  return (
    <>
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen={true} />
      {/*캐시에 저장된 쿼리를 볼 수 있음. */}
      {/*02.04질문) coin,coins에서 react-query를 사용했는데 왜 이 파일에서 캐시 렌더 하는지? 
        ㄴ>캐시는 react-query 내부의 전역공간에 저장됨. 그래서ReactQueryDevtools는 어디에든 써도 상관 없음.
          그러나 coins파일이 렌더 되기 전에, app이 시작하자마자 미리 쿼리를 보면 디버깅하기 편하기 떄문에 이 밖에다 써준 것임.
      */}
    </>
  );
}

export default MovieApp;
