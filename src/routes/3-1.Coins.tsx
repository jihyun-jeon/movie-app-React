import styled from "styled-components";
import Coin from "./3-2.Coin";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../3-0.api";

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

const CoinUl = styled.ul``;

const CoinLi = styled.li`
  /* padding: 20px; <-li에서 패딩을 주지 말고 a에서 패딩을 줘서 카드 어느부분을 눌러도 링크 클릭되도록 하기! */
  border-radius: 15px;
  margin-bottom: 10px;
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  &:hover {
    a {
      // li에 a태그를 쓰면 새로고침이 되버려서 link를 걸었는데, 여기서 굳이 여기서 a태그로 쓰면 li요소가 -> a태그로 바뀜
      color: ${(prop) => prop.theme.accentColor};
    }
  }
  a {
    transition: color 0.3s ease-in;
    /* display: block; // <-이걸 써주면 a태그가 글씨뿐 아니라 카드 끝까지 늘어나서 카드를 클릭하면 링크에 들어가지게 됨. */
    //1) display: block;하면 a태그가 늘어나는 이유?
    // : inline: 컨텐츠 너비 만큼 가로길이를 갖음
    // : blobk: 기본 너비값은 100%  만큼 가로길이를 갖음. 전체를 차지하기 때문에 각 요소들이 수직으로 쌓임 ( 한 줄에 한개만 배치 )
    padding: 20px;
    display: flex; // 아이콘과 비트코인명을 정렬해줌
    align-items: center;
    justify-content: center;
  }
`;

const Title = styled.h1`
  color: ${(prop) => prop.theme.accentColor};
  font-size: 40px;
`;

const ImgComp = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

interface CoinArrInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  /*react-query 사용
    *useQuery라는 훅이 api를 호출하는 fetcher함수인 fetchCoins를 불러오고,
    fetchCoins함수가 api 불러오는 중일땐 isLoading은 true임.
    fetchCoins함수가 끝나면 isLoading값을 false로 바꾸고, 리턴값을 data에 넣음.
    *react-query가 데이터를 캐시에 저장해 두게 됨.(react-query는 데이터를 파괴하지 않고 유지하고 있음)
    따라서 coin페이지에서 뒤로가기 눌렀을떄 coins페이지에 다시 loading...이 보이지 않는 것임.
    ㄴreact-query 는 api에 다시 접근하지 않게됨.
    *react-query에 있는 devtools를 import하면 캐시에 저장된 쿼리를 볼 수 있음.
  */

  const { isLoading, data } = useQuery<CoinArrInterface[]>(
    "allCoins",
    fetchCoins
    //fetchCoins함수의 반환값은 promise 객체 안에{json데이터 값 있는꼴} <-원래 이건데 useQuery를 이용하면 data에 바로 json데이터 값만 딱 들어가게 됨(.then()할 필요 없음)
    //data에 값이 들어가면 isloading도 true => false 바뀜
    //allCoins : key이름임(이 쿼리의 특정 이름을 붙여주는 것). api 호출할떄? 유니크한 키 이름을 지정해 줘야 함.(li에 key를 넣는 것과 같은 원리)
    //  ㄴ> react-query 캐시에 저장되고 작동하기 위해 고유한 값을 붙여준 것임.
    //  ㄴ> 이게 있어야 한번 캐시에 저장된 값이면, 이미 캐시에 어떤 데이터가 있는지 알곤 다시 api호출 안할 수 있게 됨.
  );
  /*// < react-query를 이용하면 이 주석된 코드 통째로 한줄로 바뀜>
  const [loading, setLoad] = useState(true);
  const [coinArr, setCoinArr] = useState<CoinArrInterface[]>([]);
  //질문1)<CoinInterface[]> :typescript에게 state는 coinarr로 이뤄진 배열이라고 알려주는 것임.
  // coinArr은 배열인데 그 배열안의 요소의 형식이 이런 형식이라고 인터페이스로 지정해주는 것임.
  // string,obj등은 그냥 초기값에 따라 형식이 정해지지만, 배열은 배열안에 요소 하나하나의 생김새를 알 수 없어 지정해줘야 하는 것임.

  // api호출 방법1
  // useEffect(() => {
  //   fetch("https://api.coinpaprika.com/v1/coins")
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setCoinArr(result.slice(0, 100));
  //       setLoad((cur) => !cur);
  //     });
  // }, []);

  // api호출 방법2
  useEffect(() => {
    (async () => {
      const response = await fetch("https://api.coinpaprika.com/v1/coins");
      const result = await response.json();
      setCoinArr(result.slice(0, 100));
      setLoad((cur) => !cur);
    })();
  }, []);
  // console.log(coinArr);
  */

  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        "Loading..."
      ) : (
        <CoinUl>
          {data?.slice(0, 100).map((el) => (
            <CoinLi key={el.id}>
              {/*<Link to={} state={} >  <-다른 화면(Coin 컴포넌트)으로 데이터를 보낼 수 있음 
              /id 주소로 연결될때 state로 추가정보를 보낼 수 있음. 이후 이 정보는 window.location에 이 정보가 저장됨.
               useLocation을 이용해 이 정보를 받아올 수 있음. */}
              <Link to={`/${el.id}`} state={{ name: el.name, rank: el.rank }}>
                <ImgComp
                  src={`https://cryptoicon-api.vercel.app/api/icon/${el.symbol.toLocaleLowerCase()}`}
                />
                {el.name} &rarr;
              </Link>
            </CoinLi>
          ))}
        </CoinUl>
      )}
    </Container>
  );
}
export default Coins;

//질문2)a태그 대신 Link 사용하는 이유?
// a태그를 사용하면 페이지가 새로고침 되버림. 새로운 페이지로 아예 이동해버림. <-단점:화면이 하얀색으로 바꼇다 다시 나타나게 됨.
//그래서 그 대신 react-router-dom의 Link를 사용하는 것임! <-link를 사용하면 한 페이지에서 다른 컴포넌트를 렌더해주는 것임.(e.preventdefault 처럼!)
//spa(single page anchor):페이지는 하난데 js구성을 달리해서 바꿔보여주는 것임. <-장점: 화면이 하얀색으로 바뀌지 않고 바로 나타나게 됨.
