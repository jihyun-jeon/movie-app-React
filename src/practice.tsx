// [P1]npm i styled-components  <-터미널에 styled-component를 설치해줌
import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.backgroundColor};
  //하위 컴포넌트에서 상위 컴포넌트인 ThemeProvider의 prop인 "theme"에 접근할 수 있음
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
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

const Emoji = styled.span`
  font-size: 30px;
`;

const Box = styled.div`
  height: 200px;
  width: 200px;
  background-color: skyblue;
  /* [p1]-애니메이션 적용하는 법(keyframes)*/
  animation: ${rotateAni} 3s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  // [p2]-부모컴포넌트(Box) 안에서 자식 요소를 선택하여 스타일 지정해 줄 수 있음(모든게 다 컴포넌트일 필요는 없음!)
  /* span{
     color: white;
    &:hover {
      font-size: 90px;
    }
  } */

  // [p3] = span이라고 바로 태그명을 지정할 수 있지만, 태그명이 변해도 적용될 수 있기 위해 자식요소도 컴포넌트를 만들어 적용함.
  // styled 컴포넌트 안에서 다른 styled 컴포넌트를 지정할 수 있음.

  ${Emoji} {
    background-color: gray;
    &:hover {
      font-size: 90px;
    }
    &:active {
      // 클릭하고 있는 상태가 active임
      opacity: 0;
    }
  }
  /* span: hover <-이렇게 쓰는걸 간단하게 &:hover 이렇게 쓸 수 있음.*/
`;

function Practice() {
  return (
    <Wrapper>
      <Box>
        <Emoji>🔺</Emoji>
      </Box>
      <Emoji>‼️</Emoji>
      <Title>title</Title>
    </Wrapper>
  );
}

export default Practice;
