# 리액트 마스터

## styeld-component

### 설치

```
npm i styled-components
// 타입스크립트 사용시 타입정의
npm i -D @types/styled-components
```

### 사용법

- 이미 정의된 styled 컴포넌트 상속 받아 사용 가능

```js
// Box 컴포넌트를 상속받아 Box2 라는 컴포넌트 생성
const Box2 = styled(Box)`
  background: red;
`;
```

- props 전달

```js
const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
`;

function App() {
  return (
    <Father>
      <Box bgColor="teal" />
    </Father>
  );
}
```

- attrs(): HTML 엘리먼트의 속성도 부여가능

```js
const Input = styled.input.attrs({ required: true })`
  background-color: tomato;
`;
```

- 애니메이션 사용

```js
const rotationAnimation = keyframes`
  0% {
    transform:rotate(0deg);
    border-radius:0px;
  }
  50% {
    border-radius:100px;
  }
  100%{
    transform:rotate(360deg);
    border-radius:0px;
  }
`;

const Box = styled.div`
  animation: ${rotationAnimation} 1s linear infinite;
`;
```

- 계단식 정의에도 styled 컴포넌트 사용 가능

```js
const Box = styled.div`
  // Box 컴포넌트 안에 Emoji
  ${Emoji}:hover {
    font-size: 98px;
  }
`;

function App() {
  return (
    <Box>
      <Emoji>🤩</Emoji>
    </Box>
  );
}
```

## 타입스크립트

### 설치

- create-react-app 으로 자바스크립트 프로젝트를 만든후 변경하는 것은 비추!(tsconfig.json 이 생성이 안되는 오류가 있음.)

```
npx create-react-app my-app --template typescript
```

- 자바스크립트로 만들어진 패키지의 경우 @types 패키지를 설치해준다.

```
npm i @types/styled-components
```

### 활용

#### Props

- interface 로 props 의 type 을 명시
- default 값을 사용할 경우 ?(옵셔널)로 타입이 명시되어 있어야한다.

```js
import styled from 'styled-components';

interface CircleProps {
  bgColor: string;
  borderColor?: string;
  txt?: string;
}

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

const Container =
  styled.div <
  ContainerProps >
  `
  width: 200px;
  height: 200px;
  background: ${(props) => props.bgColor};
  border: 5px solid ${(props) => props.borderColor};
  border-radius: 50%;
`;

const Circle = ({ bgColor, borderColor, txt = 'default' }: CircleProps) => {
  return (
    <Container bgColor={bgColor} borderColor={borderColor || bgColor}>
      {txt}
    </Container>
  );
};

export default Circle;
```

#### State

```js
const Form = () => {
  const [value, setValue] = useState < string > '';

  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    setValue(event.currentTarget.value);
  };

  return (
    <form>
      <input type="text" onChange={onChange} value={value} />
      <button>서브밋</button>
    </form>
  );
};
```

#### styled-components 사용

- theme 사용시 styled.d.ts(생성) 에 type 을 명시
- props.theme의 인터페이스로 사용
- DefaultTheme 인터페이스는 비어 있으므로 확장

```js
// import original module declarations
import 'styled-components';

// and extend them!
declare module 'styled-components' {
  export interface DefaultTheme {
    bgColor: string;

    colors: {
      main: string;
      secondary: string;
    };
  }
}
```

- index 에서 theme 을 import 하여 사용

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { darkTheme, lightTheme } from './theme';

let root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
```

## react-query

- api.ts 를 생성 promise 를 return 하는 api 함수를 export

```js
const BASE_URL = 'https://api.coinpaprika.com/v1';

export const getCoins = () => {
  return fetch(`${BASE_URL}/coins`).then((res) => res.json());
};

export const getCoinData = (coinId: string) => {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
};
```

- index.js 에 설정 queryClient 객체를 만들어 QueryClientProvider 컴포넌트의 props 로 전달

```js
// Create a client
const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={lightTheme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

- 컴포넌트에서 사용법

```js
  const { isLoading: dataLoading, data: coinData } = useQuery<ICoinData>(
    ['data', 'coin'],
    () => getCoinData(coinId!)
  );
```

## recoil

- 리액트 상태 관리 라이브러리

### 사용법

- root 파일 (index || app) 에 <RecoilRoot> 컴포넌트 세팅

```js
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById('root')
);
```

- state 를 저장할 atoms.js 파일을 생성 사용하고 싶은 state 를 atom() 함수를 이용하여 생성

```js
import { atom } from 'recoil';

export const isDarkAtom = atom({
  key: 'isDark',
  default: false,
});
```

- 사용하고 싶은 컴포넌트에서 useRecoilState(`atom명`) 을 이용하여 사용

```js
import { isDarkAtom } from 'atoms';
import { useRecoilState } from 'recoil';

const BtnToggleTheme = () => {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);

  return (
    <button
      onClick={() => {
        setIsDark((prev) => !prev);
      }}
    >
      Toglle
    </button>
  );
};
```
