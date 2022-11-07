import jwt from "jsonwebtoken";


export const verifyToken = (req, res, next) => {
  if (req.headers.authorization) {
    let decode = jwt.verify(req.headers.authorization, process.env.JWT);
    if (decode) {
      req.userId = decode.id;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized1" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};
