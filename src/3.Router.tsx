import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coins from "./routes/3-1.Coins";
import Coin from "./routes/3-2.Coin";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes(구 switch): 한번에 하나의 route를 렌더링 할 수 있는 방법*/}
        <Route path="/" element={<Coins />}></Route>
        <Route path="/:coinId/*" element={<Coin />}></Route>
        {/* 
        1./:변수명 <-url이 변수값을 갖는다는 걸 말해주는 것임 
        2./:변수명/* (nested routes 중첩경로) 
        ㄴ>우리의 /coinId 경로의 끝에 / *를 추가함으로써, coinId가 중첩 된 경로 구성 요소를 가지고 있고 
         즉,/:coinId 인 url주소에 들어간 후 또 /coinId/print <-이렇게 중첩된 경로가 있는 것임.
         부모 경로가 /coinId 뿐만 아니라 /coinId/* 패턴과 일치하는 다른 url과 일치해야한다고 React Router에게 말하고 있는 것임.
        */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
