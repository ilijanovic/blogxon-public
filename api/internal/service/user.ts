import User from '../model/user'
import mongoose from "mongoose"


import { AuthorInterface, NewUserInterface, UserInterface, UserModelInterface } from "../../../types"
import { utilsService } from './utils'



class UserService {

    public findUserById(_id: mongoose.Types.ObjectId | string, sensitive?: false): Promise<UserInterface>
    public findUserById(_id: mongoose.Types.ObjectId | string, sensitive?: true): Promise<UserModelInterface | null>
    public findUserById(_id: mongoose.Types.ObjectId | string, sensitive: Boolean = false): Promise<UserModelInterface | UserInterface | null> {
        if (sensitive) return User.findOne({ _id }).exec()
        return User.findOne({ _id }, { password: 0 }).exec()
    }


    public findUserByEmail(email: string, sensitive?: true): Promise<UserModelInterface | null>
    public findUserByEmail(email: string, sensitive?: false): Promise<UserInterface | null>
    public findUserByEmail(email: string, sensitive: Boolean = false): Promise<UserModelInterface | UserInterface | null> {
        if (sensitive) return User.findOne({ email }).exec()
        return User.findOne({ email }, { password: 0 }).exec()
    }
    public async getAuthors(): Promise<AuthorInterface[]> {
        let users = await User.find().exec()
        return users.map(({ author, _id }) => ({ ...author, _id }))
    }

    public saveAuthor(_id: mongoose.Types.ObjectId | string, author: AuthorInterface): Promise<UserModelInterface | null> {
        return User.findOneAndUpdate({ _id }, { author }, { new: true }).exec()
    }

    public async getAuthorById(_id: mongoose.Types.ObjectId | string): Promise<AuthorInterface | undefined> {
        return (await User.findOne({ _id }).exec())?.author
    }
    public saveUser(user: NewUserInterface): Promise<UserModelInterface> {
        let newUser = new User(user)
        return newUser.save()
    }

    public deleteUserById(_id: mongoose.Types.ObjectId | string): Promise<any> {
        return User.deleteOne({ _id }).exec()
    }

    public getUsers(): Promise<UserInterface[]> {
        return User.find({}, { password: 0, "author.ips": 0 }).exec()
    }

    public async updateAuthorImage(authorId: string | mongoose.Types.ObjectId, pngPath: string, webpPath: string): Promise<void> {
        let author = await this.getAuthorById(authorId)
        if (!author) throw "Cannot find author"
        let oldImage = author.image;
        let oldWebpImage = author.image_webp

        author.image_webp = webpPath;
        author.image = pngPath;
        await Promise.all([
            utilsService.deleteFile(oldImage),
            utilsService.deleteFile(oldWebpImage)
        ])
        await this.saveAuthor(authorId, author)
    }
}

export const userService: UserService = new UserService()

