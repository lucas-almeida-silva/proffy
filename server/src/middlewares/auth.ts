import { promisify } from 'util';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig'

export default async (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if(!authHeader) {
    return response.status(401).send({error: 'No token provided'});
  }

  const parts = authHeader.split(' ');

  if(!(parts.length === 2)) {
    return response.status(401).send({error: 'Token error'});
  }

  const [scheme, token] = authHeader.split(" ");

  if(!/^Bearer$/i.test(scheme)) {
    return response.status(401).send({error: 'Token malformatted'});
  }

  try {
    const decoded =<any> await promisify<string, jwt.Secret, jwt.VerifyOptions>(jwt.verify)(token, jwtConfig.publicKey, jwtConfig.authOptions as jwt.VerifyOptions);

    request.userId = decoded.id;

    return next();
  } catch(err) {
    return response.status(401).send({
      error: 'Token invalid'
    });
  }
} 
