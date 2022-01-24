// [P1]npm i styled-components  <-터미널에 styled-component를 설치해줌
import styled from "styled-components";

// [P2]각 컴포넌트를 만듦 (styled.html요소`css코드`)
const Father = styled.div`
  display: flex;
`;

const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: ${(props) =>
    props.bgColor}; //[P3]props를 받는 함수를 적어줌
`;

// [P4]기존의 Box컴포넌트 속성에 추가적으로 속성 더해줄 경우
const Circle = styled(Box)`
  border-radius: 50%;
`;

const Btn = styled.button`
  color: white;
  background-color: tomato;
  border: 0;
  border-radius: 15px;
`;

// [P5]컴포넌트 만들때 요소의 속성값을 지정해 줄 수 있음.
const Input = styled.input.attrs({ required: true, maxLength: 5 })`
  background-color: tomato;
`;

function StyledComponent() {
  return (
    <div>
      <Father>
        <Box bgColor="teal" /> {/*[P3]props를 통해 컴포넌트에 데이터를 보냄 */}
        <Circle bgColor="tomato" />
      </Father>
      <Btn>Log in</Btn>
      {/*[P6] as: btn과 같은 스타일을 사용하는데 태그요소가 다를 경우 */}
      <Btn as="a" href="www.naver.com">
        Log in
      </Btn>
      <br />
      {/** */}
      <Input />
      <Input />
      <Input />
    </div>
  );
}

export default StyledComponent;
