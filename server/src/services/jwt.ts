import jwt, { JsonWebTokenError } from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig';

export default function generateToken(payload: any) {
  return jwt.sign(payload, jwtConfig.privateKey, jwtConfig.authOptions as jwt.SignOptions);
}