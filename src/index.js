import React from "react";
import ReactDOM from "react-dom";
import Practice from "./practice";
import AniApp from "./AniApp";
import StyledComponent from "./styledComponent";
import { ThemeProvider } from "styled-components";

const darkTheme = {
  backgroundColor: "#111",
  textColor: "whitesmoke",
};

/* Theme: , 프로퍼티 이름이 같아야 함 */
const lightTheme = {
  backgroundColor: "whitesmoke",
  textColor: "#111",
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      {/*AniApp안에 있는 모든 컴포넌틀들이 이 theme obj의 프로퍼티에 접근할 수 있음.  */}
      <AniApp />
    </ThemeProvider>
    {/* <Practice /> */}
    {/* <StyledComponent /> */}
  </React.StrictMode>,
  document.getElementById("root")
);
