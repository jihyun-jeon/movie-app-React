// [P1]npm i styled-components  <-터미널에 styled-component를 설치해줌
import styled, { keyframes } from "styled-components";

const wrapper = styled.div`
  display: flex;
`;

/* [p1]-애니메이션 적용하는 법(keyframes)*/
const rotateAni = keyframes`
0%{
  transform: rotate(0deg);
  border-radius: 0px;
}
50%{
  border-radius: 100px;
}
100%{
  transform: rotate(360deg);
  border-radius: 0px;
}
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: tomato;
  /* [p1]-애니메이션 적용하는 법(keyframes)*/
  animation: ${rotateAni} 3s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  // [p2]-부모컴포넌트(Box) 안에서 자식 요소를 선택하여 스타일 지정해 줄 수 있음(모든게 다 컴포넌트일 필요는 없음!)
  span {
    font-size: 40px;
    &: hover {
      font-size: 60px;
    }
    &:active {
      // 클릭하고 있는 상태가 active임
      opacity: 0;
    }
  }
  /* span: hover { <-이렇게 쓰는걸 간단하게 &:hover 이렇게 쓸 수 있음.
    font-size: 60px;
  } */
`;

function AniApp() {
  return (
    <wrapper>
      <Box>
        <span>🔺</span>
      </Box>
    </wrapper>
  );
}

export default AniApp;
