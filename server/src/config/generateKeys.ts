import {generateKeyPairSync} from 'crypto';
import { writeFileSync } from 'fs';
import path from 'path';

const { publicKey, privateKey } = generateKeyPairSync('rsa', {
  modulusLength: 2048,  
  publicKeyEncoding: {
    type: 'spki',       
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',      
    format: 'pem'
  }
});

writeFileSync(path.resolve(__dirname, 'keys', 'privateKey.pem'), privateKey);
writeFileSync(path.resolve(__dirname, 'keys', 'publicKey.pem') , publicKey);
