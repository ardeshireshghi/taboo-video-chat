import React, { useEffect, useRef, useState } from 'react';
import { Modal, ModalBody, ModalHeader } from 'shards-react';

import { CenteredContainer } from '../components/shared/CenteredContainer';
import { useCallback } from 'react';
import { useCreateTopic } from '../hooks/useCreateTopic';

import { ChooseTopicForm, LoadingSandClock } from '../components/ChooseTopic';
import { useUserChat } from '../hooks/useUserChat';
import { getConfig } from '../infrastructure/config';
import { ChatState } from '../domain/Chat';
import { useHistory } from 'react-router-dom';

export default function ChooseTopic() {
  const history = useHistory();
  const { error, loading, create, topic } = useCreateTopic();
  const { getChats, userChats } = useUserChat();
  const [pollingMaxAttemptsReached, setPollingMaxAttemptsReached] =
    useState(false);
  const chatPollInterval = useRef(null);
  const chatPollCounter = useRef(0);
  const {
    chatPollIntervalSeconds: pollIntervalSeconds,
    chatPollingTimeSeconds
  } = getConfig();
  const pollMaxRetries = Math.floor(
    chatPollingTimeSeconds / pollIntervalSeconds
  );

  const handleChooseTopicSubmit = useCallback(
    (topicName) => {
      create({ name: topicName });
    },
    [create]
  );

  const pollChatWithTimeout = useCallback(() => {
    getChats();
    chatPollCounter.current += 1;

    if (chatPollCounter.current <= pollMaxRetries) {
      chatPollInterval.current = setTimeout(() => {
        pollChatWithTimeout();
      }, pollIntervalSeconds * 1000);
    } else {
      setPollingMaxAttemptsReached(true);
    }
  }, [
    getChats,
    pollIntervalSeconds,
    chatPollCounter,
    pollMaxRetries,
    setPollingMaxAttemptsReached
  ]);

  useEffect(() => {
    if (topic && !chatPollInterval.current) {
      pollChatWithTimeout();
    }
  }, [topic, chatPollInterval, pollChatWithTimeout, getChats]);

  useEffect(() => {
    if (userChats.length && topic) {
      const firstNonFullfilledChatWithSameTopic = userChats.find(
        (chat) =>
          chat.state !== ChatState.Fullfilled && chat.topic.name === topic.name
      );

      if (firstNonFullfilledChatWithSameTopic) {
        history.push(`/chat/${firstNonFullfilledChatWithSameTopic.id}`);
      }
    }
  }, [userChats, history, topic]);

  return (
    <CenteredContainer>
      {!topic && (
        <ChooseTopicForm
          onSubmit={handleChooseTopicSubmit}
          submitStatus={loading ? 'submitting' : error ? 'error' : 'pending'}
        />
      )}

      {topic && (
        <>
          {!pollingMaxAttemptsReached && <LoadingSandClock />}
          <Modal centered open={true} toggle={() => {}}>
            {!pollingMaxAttemptsReached && (
              <>
                <ModalHeader>Thanks 🙏</ModalHeader>
                <ModalBody>
                  Please wait while we find a person with interest in{' '}
                  <strong>"{topic.name}"</strong>.
                </ModalBody>
              </>
            )}
            {pollingMaxAttemptsReached && (
              <>
                <ModalHeader>No matches found 😞</ModalHeader>
                <ModalBody>
                  Looks like your topic of interest has not found any match yet.
                  We will notify you once we find a match.
                </ModalBody>
              </>
            )}
          </Modal>
        </>
      )}
    </CenteredContainer>
  );
}
