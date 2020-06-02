import styled, { keyframes } from 'styled-components';

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

export const Spinner = styled.div`
  top: 50%;
  position: relative;
  border: 0.2em solid rgba(0, 0, 0, 0.1);
  border-top: 0.2em solid #d14f69;
  border-radius: 50%;
  width: 2.3rem;
  height: 2.3rem;
  animation: ${spin} 0.6s linear infinite;
`;

export default Spinner;
