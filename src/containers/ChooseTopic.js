import React, { useEffect } from 'react';
import { Modal, ModalBody, ModalHeader } from 'shards-react';

import { CenteredContainer } from '../components/shared/CenteredContainer';
import { useCallback } from 'react';
import { useCreateTopic } from '../hooks/useCreateTopic';

import { ChooseTopicForm, LoadingSandClock } from '../components/ChooseTopic';

export default function ChooseTopic() {
  const { error, loading, create, topic } = useCreateTopic();

  const handleChooseTopicSubmit = useCallback(
    (topicName) => {
      create({ name: topicName });
    },
    [create]
  );

  useEffect(() => {
    // TODO: Handle polling for user chats here
  }, [topic]);

  return (
    <>
      {!topic && (
        <ChooseTopicForm
          onSubmit={handleChooseTopicSubmit}
          submitStatus={loading ? 'submitting' : error ? 'error' : 'pending'}
        />
      )}

      {topic && (
        <CenteredContainer>
          <LoadingSandClock />
          <Modal centered open={true}>
            <ModalHeader>Thanks</ModalHeader>
            <ModalBody>
              🙏 Please wait while we find a person with interest in{' '}
              <strong>"{topic.name}"</strong>. If it takes more than 5 minutes,
              we will notify you once we find one.
            </ModalBody>
          </Modal>
        </CenteredContainer>
      )}
    </>
  );
}
