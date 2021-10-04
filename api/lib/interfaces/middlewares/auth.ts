import jwt from 'express-jwt';
import getConfig from '../../infrastructure/config';

export function authorizer() {
  return jwt({
    secret: getConfig().jwtPublicKey,
    algorithms: ['RS256'],
    requestProperty: 'auth'
  });
}
