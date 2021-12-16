import bcrypt from "bcrypt";
import {Request, Response} from "express"
import { Client }  from "../entities/user.entity";

export const getUser = async (req:Request, res: Response) => {
  const data = await Client.find() 
  res.status(200).json({ data })
}

export const createUser = async (req: Request, res:Response) => {
  console.log(req.body);
  try {
    const {
      username,
      password,
      email
    }  = req.body;

    const hash = await bcrypt.hash(password, 10);

    const newUser = Client.create({
      username,
      password: hash,
      email,
    })

    await newUser.save();
    res.status(201).json({ data: hash })
  } catch (e) {
    console.log("This is error", e)
    
    //TODO define a status code 
    res.json({ success: 'false', error: e })
  }
}
