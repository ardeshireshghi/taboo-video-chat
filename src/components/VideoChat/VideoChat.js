import React, { useEffect } from 'react';
import { useRef } from 'react';

const JITSI_APP_NAME = 'vpaas-magic-cookie-15ba2c1858914be4913bfa73a6d28bc2';

export const VideoChat = ({
  displayName,
  roomName,
  token,
  domain = '8x8.vc'
}) => {
  const videoContainerRef = useRef(null);
  const jitsiApi = useRef(null);

  useEffect(() => {
    if (videoContainerRef.current && !jitsiApi.current) {
      const options = {
        roomName: `${JITSI_APP_NAME}/${roomName}`,
        width: 800,
        height: 800,
        displayName,
        parentNode: videoContainerRef.current,
        jwt: token
      };

      jitsiApi.current = new window.JitsiMeetExternalAPI(domain, options);
    }
  }, [videoContainerRef, displayName, roomName, token, domain]);

  return <div ref={videoContainerRef}></div>;
};

export default VideoChat;
