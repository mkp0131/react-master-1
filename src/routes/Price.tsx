import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const PriceInfoList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5em;
  li {
    background: ${(props) => props.theme.boxColor};
    border-radius: ${(props) => props.theme.bdRadius};
    padding: 1em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .percent {
      color: ${(props) => props.theme.colors.main};
      font-size: 120%;
      font-weight: 700;
      span {
        font-size: 80%;
        margin-left: 0.25em;
        opacity: 0.5;
      }
    }
    strong {
      font-weight: 700;
    }
  }
`;

interface RouterState {
  state: {
    price: {
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

const Price = () => {
  const location = useLocation();
  const { state } = location as RouterState;

  return (
    <>
      <PriceInfoList>
        <li>
          <div>
            <strong>15분</strong> 변동사항
          </div>
          <div className="percent">
            {state.price.percent_change_15m}
            <span>%</span>
          </div>
        </li>
        <li>
          <div>
            <strong>1시간</strong> 변동사항
          </div>
          <div className="percent">
            {state.price.percent_change_1h}
            <span>%</span>
          </div>
        </li>
        <li>
          <div>
            <strong>6시간</strong> 변동사항
          </div>
          <div className="percent">
            {state.price.percent_change_6h}
            <span>%</span>
          </div>
        </li>
        <li>
          <div>
            <strong>1주일</strong> 변동사항
          </div>
          <div className="percent">
            {state.price.percent_change_7d}
            <span>%</span>
          </div>
        </li>
        <li>
          <div>
            <strong>한달</strong> 변동사항
          </div>
          <div className="percent">
            {state.price.percent_change_30d}
            <span>%</span>
          </div>
        </li>
      </PriceInfoList>
    </>
  );
};

export default Price;
