import React, { useState } from 'react';
import {
  CardTitle,
  CardBody,
  Row,
  Col,
  FormGroup,
  FormInput,
  Alert
} from 'shards-react';

import { useCallback } from 'react';
import { DefaultCard } from '../shared/DefaultCard';
import { ButtonWithLoading } from '../shared/ButtonWithLoading';

export default function ChooseTopicForm({ submitStatus, onSubmit = () => {} }) {
  const [topicName, setTopicName] = useState('');

  const handleTopicChosenClick = useCallback(() => {
    if (!topicName) {
      return;
    }

    onSubmit(topicName);
  }, [topicName, onSubmit]);

  return (
    <>
      <Row>
        <Col sm={{ size: 12 }}>
          <DefaultCard>
            <CardBody>
              <CardTitle size="lg">Choose a topic</CardTitle>
              <FormGroup>
                <FormInput
                  id="#topic"
                  size="lg"
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                  placeholder="e.g Love"
                />
              </FormGroup>
              <FormGroup>
                <ButtonWithLoading
                  pill
                  size="lg"
                  onClick={handleTopicChosenClick}
                  theme="success"
                  isLoading={submitStatus === 'submitting'}
                >
                  Confirm
                </ButtonWithLoading>
              </FormGroup>
            </CardBody>
          </DefaultCard>
        </Col>
      </Row>

      {submitStatus === 'error' && (
        <Alert theme="danger">
          There was a problem creating a new topic. Please try later
        </Alert>
      )}
    </>
  );
}
