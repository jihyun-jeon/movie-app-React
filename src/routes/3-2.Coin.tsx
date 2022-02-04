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
import { useQuery } from "react-query";
import { fetchInfoData, fetchPriceData } from "../3-0.api";
// 질문1) import { fetchInfoData as x } from ~ <- 여기서의 as는: 모듈 신텍스 구문의 사용방법임 :

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
    // 형제요소 중 1번째 형제요소
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
interface RouteParams {
  coinId: string;
}
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
  // const [loading, setLoad] = useState(true);
  const { coinId } = useParams() as RouteParams;
  //useParams: url에서의 변수 정보를 잡아내기 위한것
  // 구버전은 useParams<interface명>이렇게 해줘서 params의 형식을 지정해줘야 했는데,
  // 신버전은 useParams쓰는 순간 타입이 string or undefined로 되서 따로 인터페이스 걸어줄 필요x

  /*useLocation:현재 url에 대한 정보를 나타냄(Link에서 특정 주소일때 특정 데이터(state)를 보냈는데 그 데이터도 나타나는 것임.)  
   window.useLocation() 하면 window에 있는 location의 값을 반환하는 것임.
   state값이 전역에 저장되는 꼴.
  */
  const location = useLocation(); // {name: 'Tether', rank: 3}
  const state = location.state as RouteState; // 질문2) as의 용도? - 타입을 단언할떄 씀(강제로 바꿀떄)

  /* <type assertion> 
  1) 타입을 단언하는 것. (=타입을 강제로 다른거로 바꾸는 걸 의미)
  2) typescript 안에있는 타입 선언은 실체가 없어서 타입스크립트 외의 파일형식엔 미치지 않는다.
    따라서 a가 string이라는 것은 ts파일 안에서만 유효함. (만일 a를 js,tsx파일에서 쓴다면 이건 넘버타입으로 됨.)
  const a: number =30;
  console.log(a as string); // number타입
  */

  // console.log(location);

  // useMatch : 특정한 url에 있는지 여부를 알려줌 (있으면 {}나옴, 없으면 null.)
  const priceMatch = useMatch(`/${coinId}/price`); // 우리가 /Coinid/price라는 url에 있는지 확인해 달라고 하는 것임.
  //console.log(priceMatch); // price url로 가면 obj를 받게됨.
  const chartMatch = useMatch(`/${coinId}/chart`);
  // price에서 chart로 주소가 바뀌면 기존에 실행된 useMatch의 값인 {}가 null로 바뀌고, 컴포넌트 안에 (priceMatch,chartMatch)값이 바꼇기 때문에 리렌더 된다.

  const { isLoading: infoLoading, data: infoData } =
    useQuery<InfoDataInterface>(["info", coinId], () => fetchInfoData(coinId));
  const { isLoading: priceLoading, data: priceData } =
    useQuery<PriceDataInterface>(["price", coinId], () =>
      fetchPriceData(coinId)
    );

  const loading = infoLoading || priceLoading; //둘 중 하나라도 완료되지 않으면 false인 것임. 따라서 "Loading..."이 출력됨
  /*["info", coinId] <- coinId각 각 리스트마다 다르니까 이걸 유니크한 key로 지정해줌,
    ㄴ02.04질문 1)ㅇ key갑이 둘다 [coinId]여서 각각 유니크하게 만들려고 배열로 만들었는데 저게 어떻게 되는건지? <-배열 자체를 키 이름으로 할 수 있는건지?
    ㄴ> Array keys : api 호출할떄 파라미터가 있는 경우, 그 파라미터를 배열로 넣어줘도 그게 유니크한 키가 됨.
    */
  /* *02.04질문 2) isLoading,data라고 반드시 써야하는지? ㅇ_ㅇ
     *02.04질문 3) 이름 바꿀떄 ":이름" 이렇게 하는형태가 뭔지???
      ㄴ> { isLoading: infoLoading, data: infoData } <- obj의 property를 가져온 다음 syntax를 이용해서 이름을 바꾼 것임(그냥 자바스크립트 활용한 것임)
      ㄴ> 함수로부터 return property를 받아와서 이름을 바꿨음.??? 
      */
  /*02.04질문 3) 답변
  const obj = {hello:"world"};
  const {hello} = obj;
  const {hello:hello2} = obj; <-이렇게 변수의 이름을 바꿀때 :붙여서 이름을 바꿔줄 수 있음
  */

  /* () =>fetchPriceData(coinId)
      두번쨰 인자는 fetcher함수를 넣어야 하는데 바로 넣으면 페쳐함수가 그냥 실행되버리니까 함수안에 리턴값으로 담아줌
     ㄴ>그냥 매개변수 없이 함수만 있으면 중접함수 할 필요 없는데, 매개변수를 보내줘야해서 중첩함수로 씀. */

  /* <usequery를 이용해서 이 코드를 한줄로 바꿈>
  // const [info, setInfo] = useState<InfoDataInterface>();
  // const [priceInfo, setPriceInfo] = useState<PriceDataInterface>();

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

      //  이 두개를 한줄로 합친것임.
       let response = await fetch(`https://api.coinpaprika.com/v1/tickers/btc-bitcoin/${coinId}`)
       let result = await response.json(); 
       // 질문2) 왜 await를 페치뿐 아니라 여기도 걸어주는지? 어차피 위에서 await걸면 비동기 되는데?
       //    fetch(), .json()는 프로미스를 반환함.
       // ㄴ> await 뒤에는 promise객체가 나와야 함
       //    프로미스는 비동기 실행이니까 await으로 프로미스가 fulfilled 될때까지 기다리게 해야 해서!
      

      setInfo(infoData);
      setPriceInfo(priceData);
      setLoad((cur) => !cur);
    })();
  }, [coinId]); //coinId가 변한다면 이 코드들이 다시 실행됨.
  */

  return (
    <Container>
      <Header>
        {/* <Title>Coins, {coinId}</Title> <-이 방식은 api 결과를 이용한 것임.
        그러나 밑에 방식처럼 uselocation을 이용하면 coin컴포넌트는 이미 코인의 name정보를 갖고있어서 api가 줄때까지 기다릴 필요가 없는것임.
        */}
        {/* <Title>{state?.name || "Loading..."}</Title> */}
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
          {/*질문2) state ? state,name :loading ? "Loading..." : info?.name <-이렇게 하면 안되는지? */}
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
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Open Source:</span>
              <span>{infoData?.open_source}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply:</span>
              <span>{priceData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceData?.max_supply}</span>
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
            <Route path="chart" element={<Chart coinId={coinId} />}></Route>
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;
