import Coin from 'routes/Coin';
import Coins from 'routes/Coins';
import NotFound from 'routes/NotFound';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Chart from 'routes/Chart';
import Price from 'routes/Price';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />} />
        <Route path="/:coinId" element={<Coin />}>
          <Route path="chart" element={<Chart />} />
          <Route path="price" element={<Price />} />
        </Route>
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
