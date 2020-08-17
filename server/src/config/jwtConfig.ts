import path from 'path';
import fs from 'fs';

const privateKey = fs.readFileSync(path.resolve(__dirname, 'keys', 'privateKey.pem'), "utf8");
const publicKey = fs.readFileSync(path.resolve(__dirname, 'keys', 'publicKey.pem'), "utf8");

const jwtConfig = {
  publicKey,
  privateKey,
  authOptions: {
    algorithm: 'RS256',
    expiresIn: 86400
  }
}

export default jwtConfig;