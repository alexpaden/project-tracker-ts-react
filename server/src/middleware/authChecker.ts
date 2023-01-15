import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../utils/config'

interface TokenInterface {
  id: string
  username: string
}

export interface AuthRequest extends Request {
  user: string
}

const authChecker = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.header('x-auth-token')

    if (!token) {
      return res
        .status(401)
        .send({ message: 'No auth token found. Authorization denied.' })
    }

    const decodedToken = jwt.verify(token, JWT_SECRET) as TokenInterface

    if (!decodedToken.id) {
      return res
        .status(401)
        .send({ message: 'Token verification failed. Authorization denied.' })
    }

    req.user = decodedToken.id
    next()
  } catch (error: any) {
    res.status(500).send({ message: error.message })
  }
}

export default authChecker
