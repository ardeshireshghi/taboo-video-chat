import { Container } from 'shards-react';
import styled from 'styled-components';

export const CenteredContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  min-height: calc(100% - 92px);

  > *:first-child {
    flex-basis: auto;
  }
`;
