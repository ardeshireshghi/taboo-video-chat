import jwt from 'jsonwebtoken';
import getConfig from './config';

// We create this token for both jitsi and the api so bit of a hack
export function createJWTToken({ id, email, name }, expirySeconds = 7200) {
  const payload = {
    aud: 'jitsi',
    context: {
      user: {
        id,
        name,
        email,
        avatar: 'https://avatars.dicebear.com/api/pixel-art/ardeshie.svg',
        moderator: 'false'
      },
      features: {
        livestreaming: 'true',
        recording: 'false'
      }
    },
    sub: getConfig().jitsiAppId,
    iss: 'chat',
    room: '*',
    nbf: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + expirySeconds
  };

  return jwt.sign(payload, getConfig().jwtPrivateKey, {
    algorithm: 'RS256',
    header: {
      kid: getConfig().jitsiAppId + '/92e962',
      alg: 'RS256',
      typ: 'JWT'
    }
  });
}
