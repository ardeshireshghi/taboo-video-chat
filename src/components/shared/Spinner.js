import React from 'react';
import { CgSpinner } from 'react-icons/cg';
import styled, { keyframes } from 'styled-components';

const spinAnimation = keyframes`
  0% {
    transform: rotateZ(0)
  }

  100% {
    transform: rotateZ(360deg)
  }
`;

const SpinAnimation = styled.div`
  animation: ${spinAnimation} infinite;
  animation-duration: 1s;
  animation-timing-function: linear;
  display: inline-block;
`;

const sizes = {
  sm: 32,
  md: 64,
  lg: 128
};

export const Spinner = ({ size = 'sm', ...props }) => {
  return (
    <SpinAnimation>
      <CgSpinner size={sizes[size]} {...props} />
    </SpinAnimation>
  );
};
