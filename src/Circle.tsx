import styled from "styled-components";

// [p0-1] interface :porps(인자)가 객체일 떄,그 객체의 타입 형식을 typescript에게 설명해주는 것임.
// 이후 컴포넌트에서 props을 인자로 받을 떄 형식을 검증할 수 있음.
// prop을 보내지 않거나 타입을 잘못 입력하면 코드 실행전에 오류가 나게 됨.

// [p0-3]prop을 styled 컴포넌트로 보내는 법.
// 1)인터페이스로 prop의 형식 지정함.
interface ContainerProps {
  bgColor: string;
  borderColor: string;
}
// 2)typescript에게 container가 bgcolor를 받을거라고 애기해줌
const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: ${(props) => props.bgColor};
  border: 2px solid ${(prop) => prop.borderColor};
`;

// [p0-2]
//typescript에게 bgColor은 string이 되야 한다고 설명해주는 것임.
interface CircleProps {
  bgColor: string;
  borderColor?: string;
  // [p1]optional props : ?를 쓰면 그 prop은 required가 아니게 됨.(있어도 없어도 괜찮은것)(타입이 string 또는 undifined가 됨.)
  txt?: string;
}

// prop받는 방법1 - 축약형
function Circle({ bgColor, borderColor, txt = "default" }: CircleProps) {
  //질문1) prop을 받을때 {bgcolor}<-? 변수명과 객체의 값이 같으면 요약해서 {변수명} 이렇게만 씀!
  //bgColor의 형식은 CircleProps의 obj에 있는 형식이라고 지정해 준것임.
  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? "black"}>
      {txt}
    </Container>
  );
  // [p2] ?? <-prop에 default값을 설정해줌. borderColor가 undefined면 초기값으로 black을 설정해줌
  //ContainerProps에서는 borderColor가 필수프롭이기 떄문에 혹시나 prop값 입력하지 않았다면 자동으로 블랙으로 처리됨.
}

// prop받는 방법2 - 노 축약
// function Circle(props: CircleProps) {
//   return <Container bgColor={props.bgColor} />;
// }

export default Circle;
