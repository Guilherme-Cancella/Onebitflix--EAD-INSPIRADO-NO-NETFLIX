import { NextFunction, Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'
import { UserInstance } from '../models/User'
import { jwtService } from '../services/jwtService'
import { userService } from '../services/userService'

export interface RequestWithUser extends Request {
  user?: UserInstance | null
}

export function ensureAuth(req: RequestWithUser, res: Response, next: NextFunction) {
  const authorizationHeader = req.headers.authorization

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Não autorizado: nenhum token encontrado' })
  }

  const token = authorizationHeader.replace(/Bearer /, '')

  jwtService.verifyToken(token, (err, decoded) => {
    if (err || typeof decoded === 'undefined') {
      return res.status(401).json({ message: 'Não autorizado: token inválido' })
    }

    userService.findByEmail((decoded as JwtPayload).email).then(user => {
      req.user = user
      next()
    })
  })
}

export function ensureAuthViaQuery(req: RequestWithUser, res: Response, next: NextFunction) {
  const { token } = req.query

  if (!token) {
    return res.status(401).json({ message: 'Não autorizado: nenhum token encontrado' })
  }

  if (typeof token !== 'string') {
    return res.status(400).json({ message: 'O parâmetro token deve ser do tipo string' })
  }

  jwtService.verifyToken(token, (err, decoded) => {
    if (err || typeof decoded === 'undefined') {
      return res.status(401).json({ message: 'Não autorizado: token inválido' })
    }

    userService.findByEmail((decoded as JwtPayload).email).then(user => {
      req.user = user
      next()
    })
  })
}