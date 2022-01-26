import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto; // 화면이 아무리 옆으로 커져도 가운데로 보이게 됨.
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Title = styled.h1`
  color: ${(prop) => prop.theme.accentColor};
  font-size: 40px;
`;

interface RouteState {
  name: string;
}

function Coin() {
  const [loading, setLoad] = useState(true);
  const { coinId } = useParams();
  //useParams: url에서 파라미터 부분을( 관심있는 정보를) 잡아내기 위한것
  // 구버전은 useParams<interface명>이렇게 해줘서 params의 형식을 지정해줘야 했는데,
  // 신버전은 useParams쓰는 순간 타입이 string or undefined로 되서 따로 인터페이스 걸어줄 필요x

  /*useLocation:현재 url에 대한 정보를 나타냄(Link에서 특정 주소일때 특정 데이터(state)를 보냈는데 그 데이터도 나타나는 것임.)  */
  const location = useLocation();
  const state = location.state as RouteState; // 질문1~?
  console.log(location);

  return (
    <Container>
      <Header>
        {/* <Title>Coins, {coinId}</Title> <-이 방식은 api 결과를 이용한 것임.
        그러나 밑에 방식처럼 uselocation을 이용하면 이미 코인의 name정보를 갖고있어서 api가 줄때까지 기다릴 필요가 없는것임.
        */}
        <Title>{state?.name || "Loading..."}</Title>
        {/*
        1.state가 존재하면 state의 name값을 가져오고, 존재하지 않으면 로딩...보여주기 
          home을 통해 coin화면으로 오면 state값이 전달되는데, 바로 coin화면 주소 입력하면 state가 전달되지 않음.
        2.옵셔널 체이닝
        obj?.prop – obj가 존재하면 obj.prop을 반환하고, 그렇지 않으면 undefined를 반환함
        */}
      </Header>
      {loading ? "Loading..." : null}
    </Container>
  );
}

export default Coin;
