// [P1]npm i styled-components  <-터미널에 styled-component를 설치해줌
import Circle from "./Circle";

function AniApp() {
  return (
    <div>
      {/*컴포넌트를 실행하면서 props를 보냄 */}
      <Circle bgColor="teal" borderColor="yellow" txt="wow" />
      <Circle bgColor="tomato" />
    </div>
  );
}

export default AniApp;
