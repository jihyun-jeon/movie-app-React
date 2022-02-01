import {
  useParams,
  useLocation,
  BrowserRouter,
  Route,
  Routes,
  useMatch,
} from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Price from "../routes/Price";
import Chart from "../routes/Chart";
import { Link } from "react-router-dom";

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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(prop) =>
    prop.isActive ? prop.theme.accentColor : prop.theme.textColor};
  a {
    display: block;
  }
`;

interface RouteState {
  name: string;
}

interface InfoDataInterface {
  /*
  1.콘솔창에 info 출력한 후 temp1로 만듦
  2.콘솔창에서 Object.keys(temp1).join(); / Object.values(temp1).map((v)=>typeof v).join(); 으로 데이터 출력
  3. option + shift + i <= 여러줄을 같은 커서로 움직일 수 있음.
  */
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  contract: string;
  platform: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceDataInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const [loading, setLoad] = useState(true);
  const { coinId } = useParams();
  //useParams: url에서의 변수 정보를 잡아내기 위한것
  // 구버전은 useParams<interface명>이렇게 해줘서 params의 형식을 지정해줘야 했는데,
  // 신버전은 useParams쓰는 순간 타입이 string or undefined로 되서 따로 인터페이스 걸어줄 필요x

  /*useLocation:현재 url에 대한 정보를 나타냄(Link에서 특정 주소일때 특정 데이터(state)를 보냈는데 그 데이터도 나타나는 것임.)  */
  const location = useLocation(); // {name: 'Tether', rank: 3}
  const state = location.state as RouteState; // 질문1. 어떤때 어디에다 인터페이스를 걸어줘야 하는건지?
  // console.log(location);

  const [info, setInfo] = useState<InfoDataInterface>();
  const [priceInfo, setPriceInfo] = useState<PriceDataInterface>();

  // useMatch : 특정한 url에 있는지 여부를 알려줌
  const priceMatch = useMatch(`/${coinId}/price`); // 우리가 /Coinid/price라는 url에 있는지 확인해 달라고 하는 것임.
  //console.log(priceMatch); // price url로 가면 obj를 받게됨.
  const chartMatch = useMatch(`/${coinId}/chart`);

  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      //console.log(infoData); // 마우스 오른쪽 -> 전역변수로 obj 저장
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      //console.log(priceData);

      /* 이 두개를 한줄로 합친것임.
       let response = await fetch(`https://api.coinpaprika.com/v1/tickers/btc-bitcoin/${coinId}`)
       let result = await response.json(); // 질문1) 왜 await를 페치뿐 아니라 여기도 걸어주는지? 어차피 위에서 await걸면 비동기 되는데?
       */

      setInfo(infoData); // 질문2)여기서 info값을 설정해줬는데 타입스크립트는 왜 항상 빈 obj라고 나오는지? <-4.5강의
      setPriceInfo(priceData);
      setLoad((cur) => !cur);
    })();
  }, [coinId]); //coinId가 변한다면 이 코드들이 다시 실행됨.

  return (
    <Container>
      <Header>
        {/* <Title>Coins, {coinId}</Title> <-이 방식은 api 결과를 이용한 것임.
        그러나 밑에 방식처럼 uselocation을 이용하면 coin컴포넌트는 이미 코인의 name정보를 갖고있어서 api가 줄때까지 기다릴 필요가 없는것임.
        */}
        {/* <Title>{state?.name || "Loading..."}</Title> */}
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : info?.name}
          {/*link to로 데이터 보내지면 그 데이터를 이용하고, 아니면 info데이터 활용하여 네임 출력함 4.7강의 중간까지 함 */}
        </Title>
        {/*
        1.state가 존재하면 state의 name값을 가져오고, 존재하지 않으면 로딩...보여주기 
          home을 통해 coin화면으로 오면 state값이 전달되는데, 바로 coin화면 주소 입력하면 state가 전달되지 않음.
        2.옵셔널 체이닝
        obj?.prop – obj가 존재하면 obj.prop을 반환하고, 그렇지 않으면 undefined를 반환함
        */}
      </Header>
      {loading ? (
        "Loading..."
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{info?.open_source}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{priceInfo?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceInfo?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to="chart">Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to="price">Price</Link>
            </Tab>
          </Tabs>

          {/*Nested Routes 중첩경로임. path="/:coinId/*" 이렇게 써줬기 때문에 여기선 /*에 해당되는 부분만 써도 자동으로 연결됨. */}
          <Routes>
            <Route path="price" element={<Price />}></Route>
            <Route path="chart" element={<Chart />}></Route>
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;
