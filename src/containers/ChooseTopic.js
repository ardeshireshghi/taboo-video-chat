import React, { useMemo, useState } from 'react';
import {
  Card,
  CardTitle,
  CardBody,
  Row,
  Col,
  FormGroup,
  FormInput,
  Button,
  Modal,
  ModalBody,
  ModalHeader
} from 'shards-react';

import { useHistory } from 'react-router-dom';

import { CenteredContainer } from '../components/shared/CenteredContainer';
import { useCallback } from 'react';

export default function ChooseTopic() {
  const [isTopicChosen, setTopicChosen] = useState(false);
  const [topic, setTopic] = useState('');
  let history = useHistory();

  const gotoChatPage = useCallback(
    () => history.push(`/chat/${topic}`),
    [history, topic]
  );
  const showChatPage = useMemo(() => Math.random() >= 0.5, []);

  const handleTopicChosenClick = useCallback(() => {
    if (!topic) {
      return;
    }

    showChatPage ? gotoChatPage() : setTopicChosen(true);
  }, [topic, showChatPage, gotoChatPage, setTopicChosen]);

  return (
    <CenteredContainer>
      {!isTopicChosen && (
        <Row>
          <Col sm={{ size: 6, order: 2, offset: 3 }}>
            <Card>
              <CardBody>
                <CardTitle>Choose a topic</CardTitle>
                <FormGroup>
                  <FormInput
                    id="#topic"
                    size="lg"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g Love"
                  />
                </FormGroup>
                <FormGroup>
                  <Button
                    pill
                    size="lg"
                    onClick={handleTopicChosenClick}
                    theme="success"
                  >
                    Confirm
                  </Button>
                </FormGroup>
              </CardBody>
            </Card>
          </Col>
        </Row>
      )}
      {isTopicChosen && (
        <Modal centered open={true}>
          <ModalHeader>Thanks</ModalHeader>
          <ModalBody>🙏 We will notify you once we find a match</ModalBody>
        </Modal>
      )}
    </CenteredContainer>
  );
}
