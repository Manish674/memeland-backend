import config from "config";
import jwt from "jsonwebtoken";

const signJwt = (user: any, callback: (err: Error | null, token: string | null) => void) => {
  var currentTime = new Date().getTime();
  var expirationTime = currentTime + config.get<number>("jwt.expiration") * 100000
  var expireTimeInSeconds = Math.floor(expirationTime / 1000);

  try {
    jwt.sign({
      username: user.username,
      email: user.email,
    },
    config.get("jwt.secret"),
    {
      algorithm: "HS256",
      expiresIn: expireTimeInSeconds
    },(err, token) => {
      if (err) callback(err, null)
      else if (token) callback(null, token)
    })
  } catch (e) {
    console.log("Error is from signJwt function", e)
    callback(e, null)
  }

}

export default signJwt;
