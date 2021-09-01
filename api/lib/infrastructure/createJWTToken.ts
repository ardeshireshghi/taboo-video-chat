import jwt from 'jsonwebtoken';
import getConfig from './config';

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
    sub: 'vpaas-magic-cookie-1fc542a3e4414a44b2611668195e2bfe',
    iss: 'chat',
    room: '*',
    nbf: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + expirySeconds
  };
  return jwt.sign(payload, getConfig().jwtPrivateKey, { algorithm: 'RS256' });
}
