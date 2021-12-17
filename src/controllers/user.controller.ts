import bcryptjs from "bcryptjs"
import {Request, Response} from "express"
import signJwt from "../utils/signJWT";
import { Client }  from "../entities/user.entity";

// validating token
export const validate = async (req:Request, res: Response)  => {
  res.status(200).json({ message: "token(s) validates"})
}

// Login
export const loginUser = async (req:Request, res: Response): Promise<any> => {
  try {

    const { email, password } = req.body.user;

    // check you can find the accoutn with same email
    const data:Array<any> = await Client.find({ email });
    if (!data)  return res.status(404).json({ error: "user not found" })

    // check if password matches or not
    bcryptjs.compare(password ,data[0].password, (err, result): any => {
      if (err) {
        return res.status(401).json({ errorMsg: "password mismatched", error: err }) 
      } else if (result) {
        signJwt(data[0], (_err, token):any => {
          if (_err) {
            return res.status(500).json({ errorMsg : _err.message, error: _err })
          } else if (token) {
            return res.status(200).json({
              Message: "auth successfull",
              user: data[0],
              token,
            })
          }
        })
      }
    });

  } catch (e) {
    return res.status(400).json({ errorMsg: e.message, error: e }) 
  }
}

// Register user 
export const registerUser = async (req: Request, res:Response) => {
  const {
    username,
    password,
    email
  }  = req.body.user;

  try {

    const hash = await bcryptjs.hash(password, 10);
    const newUser = Client.create({
      username,
      password: hash,
      email,
    })

    await newUser.save();
    return res.status(201).json({ success: 'true', data: newUser })
  } catch (e) {
    console.log("This is error", e)
    
    //TODO define a status code 
    return res.json({ success: 'false', error: e })
  }
}
