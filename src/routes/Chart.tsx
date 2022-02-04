import { useQuery } from "react-query";
import { fetchCoinHistory } from "../3-0.api";
import ApexChart from "react-apexcharts";

interface Ihistorycal {
  //data가 배열인데 그 요소의 타입이 어떻게 생겼는지 지정해줘야함.
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}

function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<Ihistorycal[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );

  return (
    <div>
      {isLoading ? (
        "Loading...chart"
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((el) => el.close),
            },
          ]}
          options={{
            chart: {
              height: 500,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            theme: { mode: "dark" },
            stroke: { curve: "smooth", width: 4 },
            grid: { show: false },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
            },
          }}
        />
      )}
    </div>
  );
}
export default Chart;

//apex charts
//: js의 library임.
//: 설치방법:  npm install --save react-apexcharts apexcharts
//: 사용 - ApexChart를 컴포넌트로 사용할 수 있게 됨.
//      - ApexChart 컴포넌트 안에 각종 프로퍼티를 주어 차트를 꾸며줄 수 있음
