import {
  adminService
} from '../service/admin'
import {
  userService
} from "../service/user"
import { errorService } from "../service/error"
import { passwordService } from '../service/password'
import { tokenService } from '../service/token'
import { config } from '../../../config'
import { cookieService } from '../service/cookie'
import { dashboardService } from '../service/dashboard'
import { Request, Response, NextFunction } from "express"
import { imageService } from '../service/image'


class AdminController {

  /**
   * Controller 
   * Generates an admin account.
   * Works just 1x because there is only 1 admin
   * 
   * 
   * @param {Request} req - express request
   * @param {Response} res - express response
   * @returns {Promise<Response>} - Resolves express response
   */
  public async generateAdminHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
    let { password, email } = req.body
    let adminExist = await adminService.getAdmin()

    if (adminExist)
      return res
        .status(400)
        .json({ message: 'Admin already exist. It can be only 1 admin' })
    let hashedPassword = await passwordService.hashPassword(password)
    try {
      await userService.saveUser({
        email,
        password: hashedPassword,
        role: 'admin',
      })
      return res.status(200).json({ message: 'Created Admin successfully' })
    } catch (err) {
      await errorService.writeErrorLog(err, 'generateAdminHandler')
      return res.status(500).json({ message: 'Something went wrong' })
    }
  }

  /**
   * Controller 
   * Checks if an admin exists
   * 
   * @param {Request} req - express request
   * @param {Response} res - express response
   * @returns {Promise<Response>} - Resolves express response
   */
  public async adminExistHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
    let admin = await adminService.getAdmin()
    return res.status(200).json(!!admin)
  }

  /**
  * Controller
  * Logs into the account
  * 
  * @param {Request} req - express request
  * @param {Response} res - express response
  * @returns {Promise<Response>} - Resolves express response
  */
  public async loginHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
    let { password, email } = req.body

    if (!password || !email) {
      return res.status(400).json({
        message: `Missing paramters. Password: ${!password}, Email: ${!email}`,
      })
    }
    let admin = await userService.findUserByEmail(email, true)
    if (!admin) {
      return res
        .status(400)
        .json({ message: 'Could not find admin associated with this email' })
    }

    if (!adminService.isAdmin(admin)) {
      return res.status(401).json({ message: 'You are not allowed to log in' })
    }
    let isEqual = await passwordService.comparePasswords(password, admin.password)
    if (!isEqual) {
      return res.status(401).json({ message: 'Wrong password' })
    }
    let token = await tokenService.generateToken({
      role: 'admin',
      _id: admin._id,
    })
    cookieService.setCookie(res, token, config.tokenExpiration)

    return res.status(200).json({ token })
  }

  /**
  * Controller
  * Checks an token if its valid
  * 
  * @param {Request} req - express request
  * @param {Response} res - express response
  * @returns {Promise<Response>} - Resolves express response
  */
  public async checkTokenHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
    let { token } = req.body
    if (!token || token !== 'string') {
      return res.status(400).json({ message: 'Missing token or wrong data type' })
    }
    let isValid = await tokenService.verifyToken(token)
    return res.status(200).json(isValid)
  }

  /**
  * Controller
  * Collects the statistics of your Emails, Blogs and Subscriptions
  * 
  * @param {Request} req - express request
  * @param {Response} res - express response
  * @returns {Promise<Response>} - Resolves express response
  */
  public async dashboardOverviewHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
    let { userId } = res.locals
    let admin = await userService.findUserById(userId)
    if (!admin) return res.status(404).json({ message: "Cannot find admin" })
    if (!adminService.isAdmin(admin)) {
      return res.status(401).json({ message: 'You are not allowed to do this' })
    }
    let info = await dashboardService.getDashboardOverviewData()
    return res.status(200).json(info)
  }

  /**
  * Controller
  * Returns you the admin author
  * 
  * @param {Request} req - express request
  * @param {Response} res - express response
  * @returns {Promise<Response>} - Resolves express response
  */
  public async getAdminAuthorHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      let author = await adminService.getAdminAuthor()
      return res.status(200).json(author)
    } catch (err) {
      await errorService.writeErrorLog(err, 'getAuthorHandler')
      return res.status(500).json({ message: 'Something went wrong' })
    }
  }

  public async getStatisticsHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      let statistics = await dashboardService.getStatistics();
      return res.status(200).json(statistics)
    } catch (err) {
      await errorService.writeErrorLog(err, "getStatisticsHandler");
      return res.status(500).json({ message: "Something went wrong" })
    }
  }

  public async getViewsChartDataHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
    try {
      let data = await dashboardService.getViewsChartData();
      return res.status(200).json(data)
    } catch (err) {
      await errorService.writeErrorLog(err, "getViewsChartDataHandler")
      return res.status(500).json({ message: "Someting went wrong" })
    }
  }

  public eraseCookieHandler(req: Request, res: Response, next: NextFunction): Response {

    cookieService.eraseCookie(config.cookieName, res)
    return res.status(200).json({ message: "Cookie erased" })
  }


}

export const adminController: AdminController = new AdminController()




