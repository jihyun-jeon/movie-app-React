/*
tsx라는게 ts + react 문법을 사용한다라는 의미인데
해당 파일에서는 react 문법을 사용하는 함수는 어디에도 없기때문에
*/

/* 질문) 파일형식 구별
<react들어가면 뒤에 x붙힘>
js  : js
jsx : js + react(js에 html태그 쓰는거)
tsx : ts + react
ts  : ts
*/

/*
순수js       타입이 있는거
js      === ts (html태크를 안쓰는 순수 타입스크립트)
jsx     === tsx (html태크를 쓰는 타입스크립트)
*/

// <fetcher fn> :api 호출과 관련된 것들은 컴포넌트 안에서 하는게 아니라 패쳐함수로 따로 만들어줌
export async function fetchCoins() {
  const json = await (
    await fetch("https://api.coinpaprika.com/v1/coins")
  ).json();
  return json;
}
//결과: async는 프로미스를 반환함. 근데 json()도 프로미스를 반환함 => 따라서 async 프로미스 객체 안에 json데이터 값만 저장된 형태로 반환결과가 나옴

export async function fetchInfoData(coinId: string) {
  const json = await (
    await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  ).json();
  return json;
}

export async function fetchPriceData(coinId: string) {
  const json = await (
    await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  ).json();
  return json;
}

export async function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  const startDate = endDate - 60 * 60 * 24 * 7 * 2;

  return fetch(
    `https://api.coinpaprika.com/v1/coins/${coinId}/ohlcv/historical?start=${startDate}&end=${endDate}`
  ).then((response) => response.json());
}
