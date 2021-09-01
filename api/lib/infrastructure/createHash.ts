import { createHash as cryptoCreateHash } from 'crypto';

export function createHash(address: string, algorithm: string = 'sha256') {
  return cryptoCreateHash(algorithm)
    .update(address, 'utf8')
    .digest('hex')
    .slice(0, 12);
}
