import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coins from "./routes/6.Coins";
import Coin from "./routes/7.Coin";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes(구 switch): 한번에 하나의 route를 렌더링 할 수 있는 방법*/}
        <Route path="/" element={<Coins />}></Route>
        <Route path="/:coinId" element={<Coin />}></Route>
        {/* :변수명 <-url이 변수값을 갖는다는 걸 말해주는 것임 */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
