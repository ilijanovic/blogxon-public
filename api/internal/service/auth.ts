import { tokenService } from './token'
import { cookieService } from './cookie'
import { adminService } from './admin'
import { userService } from "./user"
import { Request, Response, NextFunction } from "express"
/**
 * Checks if the request is allowed to move to the next middlewares
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Execute this function to move to the next middleware
 */

class AuthService {
  public async authentication(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    let token = tokenService.getTokenFromHeader(req)
    if (!token) {
      token = cookieService.getTokenFromCookie(req)
    }
    if (!token) return res.status(404).json({ message: 'No token found' })
    if (!(await tokenService.verifyToken(token)))
      return res.status(401).json({ message: 'You are not authorized' })
    let { _id } = tokenService.decode(token)
    let user = await userService.findUserById(_id)

    if (!user) return res.status(404).json({ message: "Cannot find user" })

    if (!adminService.isAdmin(user)) {
      return res.status(401).json({ message: 'You are not an admin' })
    }
    res.locals.userId = _id
    res.locals.token = token
    next()
  }

}

export const authService: AuthService = new AuthService()



