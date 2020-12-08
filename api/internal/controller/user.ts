
import { errorService } from '../service/error'
import { Request, Response, NextFunction } from "express"
import { userService } from '../service/user';
import { passwordService } from '../service/password';
import { AuthorInterface } from '../../../types';
import { imageService } from '../service/image';

class UserController {
    public async getAuthorsHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            let authors = await userService.getAuthors();

            return res.status(200).json(authors)
        } catch (err) {
            await errorService.writeErrorLog(err, "getAuthorsHandler");
            return res.status(500).json({ message: "Something went wrong" })
        }
    }

    public async getAuthorHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
        let { userId } = res.locals
        try {
            let author = await userService.getAuthorById(userId)
            return res.status(200).json(author)
        } catch (err) {
            await errorService.writeErrorLog(err, "getAuthorHandler")
            return res.status(500).json({ message: "Something went wrong" })
        }
    }


    public async saveAuthorHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
        let { userId } = res.locals
        let { githubLink = "", stackoverflowLink = "", twitterLink = "", name = "", bio = "" }: AuthorInterface = req.body
        try {
            let author = await userService.saveAuthor(userId, { githubLink, stackoverflowLink, twitterLink, name, bio })
            return res.status(200).json(author)
        } catch (err) {
            errorService.writeErrorLog(err, "saveAuthorHandler")
            return res.status(500).json({ message: "Something went wrong" })
        }
    }

    public async getUsersHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            let users = await userService.getUsers()
            return res.status(200).json(users)
        } catch (err) {
            await errorService.writeErrorLog(err, "getUsersHandler");
            return res.status(500).json({ message: "Something went wrong" })
        }
    }

    public async createUserHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
        let { email, password, role = "user" } = req.body
        let user = await userService.findUserByEmail(email)
        if (user) return res.status(409).json({ message: "User with this email already exist" })
        try {
            let hashedPassword = await passwordService.hashPassword(password)
            let user = await userService.saveUser({
                email,
                password: hashedPassword,
                role
            })
            return res.status(200).json(user)
        } catch (err) {
            await errorService.writeErrorLog(err, "createUserHandler");
            return res.status(500).json({ message: "Something went wrong" })
        }
    }

    public async deleteUserHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
        let { _id } = req.body
        let { userId } = res.locals
        if (userId === _id) return res.status(401).json({ message: "You cannot delete yourself" })
        try {
            await userService.deleteUserById(_id)
            return res.status(200).json({ message: "User successfully deleted" })
        } catch (err) {

            await errorService.writeErrorLog(err, "deleteUserHandler")
            return res.status(500).json({ message: "Something went wrong" })
        }
    }

    public async setProfileImageHandler(req: Request, res: Response, next: NextFunction) {
        let profile = req.file.path
        let { userId } = res.locals
        try {

            await imageService.compressImage({ path: profile })
            let webpPath = await imageService.convertToWebp(profile, req.file.filename)
            let pngPath = profile.replace('static', '')
            await userService.updateAuthorImage(userId, pngPath, webpPath)
            return res.status(200).json({ message: "Profile image changed" })
        } catch (err) {
            await errorService.writeErrorLog(err, "setProfileImageHandler");
            return res.status(500).json({ message: "Something went wrong" })
        }
    }
}

export const userController: UserController = new UserController()

