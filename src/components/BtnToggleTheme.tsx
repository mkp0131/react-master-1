import { isDarkAtom } from 'atoms';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

const Btn = styled.button`
  border: none;
  background: transparent;
  width: 45px;
  height: 45px;
  position: absolute;
  right: 10px;
  top: 10px;

  border-radius: 50%;
  padding: 0.8em;

  cursor: pointer;
  svg {
    path {
      fill: ${(props) => props.theme.fontColor};
    }
  }
  &:hover {
    box-shadow: 1px 1px 5px 0px rgb(0 0 0 / 10%);
    background: ${(props) => props.theme.boxColor};
  }
`;

const BtnToggleTheme = () => {
  const [isDark, setIsDark] = useRecoilState(isDarkAtom);

  return (
    <Btn
      onClick={() => {
        setIsDark((prev) => !prev);
      }}
    >
      {isDark ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M32 256c0-123.8 100.3-224 223.8-224c11.36 0 29.7 1.668 40.9 3.746c9.616 1.777 11.75 14.63 3.279 19.44C245 86.5 211.2 144.6 211.2 207.8c0 109.7 99.71 193 208.3 172.3c9.561-1.805 16.28 9.324 10.11 16.95C387.9 448.6 324.8 480 255.8 480C132.1 480 32 379.6 32 256z" />
        </svg>
      ) : (
        <svg
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 36.95 36.96"
        >
          <g clip-path="url(#a)" fill="#EBEBEB">
            <path d="M31.54 28.9a1.87 1.87 0 0 1-2.64 2.65L26.39 29A1.87 1.87 0 0 1 29 26.39l2.54 2.51ZM37 18.48a1.87 1.87 0 0 1-1.87 1.87h-3.6a1.87 1.87 0 0 1 0-3.74h3.55A1.871 1.871 0 0 1 37 18.48ZM16.61 5.42V1.87a1.87 1.87 0 1 1 3.74 0v3.55a1.87 1.87 0 1 1-3.74 0ZM18.48 26.68a8.2 8.2 0 1 0 0-16.4 8.2 8.2 0 0 0 0 16.4ZM20.35 31.54v3.55a1.87 1.87 0 1 1-3.74 0v-3.55a1.87 1.87 0 0 1 3.74 0ZM26.39 10.57a1.87 1.87 0 0 1 0-2.64l2.51-2.52a1.87 1.87 0 1 1 2.64 2.65L29 10.57a1.88 1.88 0 0 1-2.64 0h.03ZM5.41 8.06a1.87 1.87 0 0 1 2.64-2.65l2.51 2.51a1.87 1.87 0 1 1-2.64 2.65L5.41 8.06ZM5.42 20.35H1.87a1.87 1.87 0 0 1 0-3.74h3.55a1.87 1.87 0 1 1 0 3.74ZM10.56 29l-2.5 2.52a1.9 1.9 0 0 1-1.33.54 1.87 1.87 0 0 1-1.32-3.16l2.51-2.51A1.87 1.87 0 0 1 10.56 29Z" />
          </g>
          <defs>
            <clipPath id="a">
              <path fill="#fff" d="M0 0h36.95v36.96H0z" />
            </clipPath>
          </defs>
        </svg>
      )}
    </Btn>
  );
};

export default BtnToggleTheme;
