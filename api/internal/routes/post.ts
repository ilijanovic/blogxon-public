import { Router, RequestHandler } from 'express'
import { validator } from '../verification/requestvalidator'
import {
  emailController
} from '../controller/email'
import { subscriptionController } from '../controller/subscription'
import {
  adminController
} from '../controller/admin'
import { authService } from '../service/auth'
import { blogController } from '../controller/blog'
import { uploadBadge, uploadThumbnailImage, uploadProfile } from '../middleware/diskStorage'
import { userController } from '../controller/user'

let router = Router()

router.post('/addEmail', <RequestHandler>validator.emailValidator, <RequestHandler>emailController.addEmailHandler)

router.post('/subscribe', <RequestHandler>subscriptionController.subscribeHandler)

router.post('/sendMail', <RequestHandler>emailController.sendEmailHandler)

router.post('/sendNotification', <RequestHandler>subscriptionController.sendNotificationHandler)

router.post('/generateAdmin', <RequestHandler>validator.adminGenerateValidator, <RequestHandler>adminController.generateAdminHandler)

router.post('/login', <RequestHandler>adminController.loginHandler)

router.post('/checkToken', <RequestHandler>adminController.checkTokenHandler)

router.post('/deleteEmail', <RequestHandler>authService.authentication, <RequestHandler>emailController.deleteEmailHandler)

router.post(
  '/uploadPost',
  <RequestHandler>authService.authentication,
  <RequestHandler>uploadThumbnailImage.single('thumbnail'),
  <RequestHandler>validator.postUploadValidator,
  <RequestHandler>blogController.uploadBlogHandler
)

router.post("/uploadBadge", <RequestHandler>authService.authentication,
  <RequestHandler>uploadBadge.single("badge"),
  <RequestHandler>subscriptionController.uploadBadgeHandler)

router.post("/uploadProfile", <RequestHandler>authService.authentication, <RequestHandler>uploadProfile.single("profile"), <RequestHandler>userController.setProfileImageHandler)
router.post('/deleteBlog', <RequestHandler>authService.authentication, <RequestHandler>blogController.deleteBlogHandler)

router.post("/createUser", <RequestHandler>authService.authentication, <RequestHandler>validator.adminGenerateValidator, <RequestHandler>validator.emailValidator,
  <RequestHandler>userController.createUserHandler)

router.post("/deleteUser", <RequestHandler>authService.authentication, <RequestHandler>userController.deleteUserHandler)

router.post("/saveAuthor", <RequestHandler>authService.authentication, <RequestHandler>userController.saveAuthorHandler)

router.post("/eraseCookie", <RequestHandler>adminController.eraseCookieHandler)

router.post("/deleteBadge", <RequestHandler>authService.authentication, <RequestHandler>subscriptionController.deleteBadgeHandler)

export default router
