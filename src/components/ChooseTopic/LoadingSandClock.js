import styled, { keyframes } from 'styled-components';
import { SandClockLoader } from '../shared/SVG/SandClockLoader';

const fadeInAnimation = keyframes`
  from {
    opacity: 0;
    transform: scale(0);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const LoadingIconContainer = styled.div`
  width: 64px;
  height: 64px;
  position: relative;
  margin: 0 auto;
  top: -200px;
  box-sizing: content-box;
  justify-self: flex-start;
  opacity: 0;
  transform: scale(0);
  animation: ${fadeInAnimation} 0.5s 1 1s;
  animation-fill-mode: forwards;
`;

export function LoadingSandClock() {
  return (
    <LoadingIconContainer>
      <SandClockLoader />
    </LoadingIconContainer>
  );
}
