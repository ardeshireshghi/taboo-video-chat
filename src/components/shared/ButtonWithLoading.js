import React from 'react';
import { CgSpinner } from 'react-icons/cg';
import { Button } from 'shards-react';
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
`;
const ButtonSpinnerWrapper = styled.div`
  margin-left: 0.5rem;
  display: inline-block;
  line-height: 0;
`;

export const ButtonWithLoading = ({
  isLoading = false,
  children,
  ...props
}) => {
  return (
    <Button {...props}>
      {children}
      {isLoading && (
        <ButtonSpinnerWrapper>
          <SpinAnimation>
            <CgSpinner />
          </SpinAnimation>
        </ButtonSpinnerWrapper>
      )}
    </Button>
  );
};
