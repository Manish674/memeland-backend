import {Request, Response, NextFunction} from "express"
import jwt from "jsonwebtoken";


//TODO Define the return type 

const extractJWT = (req: Request, res:Response, next:NextFunction):any  => {
  
  // getting token from authorization headers 
  let token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: "Unauthorized"}) 

  jwt.verify(token, 'superduperencryptedshit', (err, decoded): any => {
    if (err) return res.status(401).json({ errorMessage: err.message, err})

    res.locals.jwt = decoded
    next();
  })
  
} 

export default extractJWT;
