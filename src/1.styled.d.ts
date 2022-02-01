/*Typescript에는 module을 declare module을 이용하여 extend하는 방법이 존재한다.
해당 방법을 이용하면 코드가 합쳐지는데 Style Components 에서 제공되는 
ThemeProvider를 활용하기 위해서 interface를 추가해주는 것이다.
*/

import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    //이 인터페이스는 DefaultTheme라고 불림
    textColor: string;
    bgColor: string;
    accentColor: string;
  }
}

//질문1) d.ts??
