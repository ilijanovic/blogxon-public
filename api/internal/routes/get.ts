import { RequestHandler, Router } from 'express'
import {
  adminController
} from '../controller/admin'
import { authService } from '../service/auth'
import { emailController } from '../controller/email'

import { userController } from "../controller/user"
import { blogController } from '../controller/blog'
import { subscriptionController } from '../controller/subscription'


let router = Router()


/**
 * @route   /api/internal/adminExist
 * @type    GET
 * @desc    Checks if an admin exist
 */
router.get('/adminExist', <RequestHandler>adminController.adminExistHandler)

/**
 * @route   /api/internal/dashboardOverview
 * @type    GET
 * @desc    Gets the statistics of your Emails, Blogs and Subscriptions
 */
router.get('/dashboardOverview', <RequestHandler>authService.authentication, <RequestHandler>adminController.dashboardOverviewHandler)

/**
 * @route   /api/internal/emails
 * @type    GET
 * @desc    Gets your emails
 */
router.get('/emails', <RequestHandler>authService.authentication, <RequestHandler>emailController.getEmailsHandler)

/**
 * @route   /api/internal/adminAuthor
 * @type    GET
 * @desc    Get admin author
 */
router.get('/adminAuthor', <RequestHandler>authService.authentication, <RequestHandler>adminController.getAdminAuthorHandler)

/**
 * @route   /api/internal/blogs
 * @type    GET
 * @desc    Get blogs
 */
router.get('/blogs', <RequestHandler>blogController.getBlogsHandler)

/**
 * @route   /api/internal/getBlog/:_id
 * @type    GET
 * @desc    Gets blog by ID
 */
router.get('/getBlog/:_id', <RequestHandler>blogController.getBlogHandler)


router.get("/getBlogBySlug/:slug", <RequestHandler>blogController.getBlogBySlugHandler)

/**
 * @route   /api/internal/getAuthors
 * @type    GET
 * @desc    Gets all authors
 */
router.get("/getAuthors", <RequestHandler>authService.authentication, <RequestHandler>userController.getAuthorsHandler)

router.get("/getUsers", <RequestHandler>authService.authentication, <RequestHandler>userController.getUsersHandler)


router.get("/getAuthor", <RequestHandler>authService.authentication, <RequestHandler>userController.getAuthorHandler)

router.get("/getStatistics", <RequestHandler>authService.authentication, <RequestHandler>adminController.getStatisticsHandler)

router.get("/getViewsChartData", <RequestHandler>authService.authentication, <RequestHandler>adminController.getViewsChartDataHandler)

router.get("/getThumbnails", <RequestHandler>authService.authentication, <RequestHandler>blogController.getBlogThumbnails)

router.get("/getBadges", <RequestHandler>authService.authentication, <RequestHandler>subscriptionController.getBadgesHandler)
export default router
