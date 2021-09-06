import { Container } from 'shards-react';
import styled from 'styled-components';

export const CenteredContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 100%;

  > *:first-child {
    flex-basis: auto;
  }
`;
