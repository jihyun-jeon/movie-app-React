/*
tsx라는게 ts + react 문법을 사용한다라는 의미인데
해당 파일에서는 react 문법을 사용하는 함수는 어디에도 없기때문에
*/

export async function fetchCoins() {
  const json = await (
    await fetch("https://api.coinpaprika.com/v1/coins")
  ).json();
  return json;
}
