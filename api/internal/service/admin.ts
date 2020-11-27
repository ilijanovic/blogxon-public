import User from '../model/user'
import { AuthorInterface, UserInterface } from "../../../types"

class AdminService {

  public getAdmin(): Promise<UserInterface | null> {
    return User.findOne({ role: 'admin' }).exec()
  }

  public isAdmin(user: UserInterface): Boolean {
    return user.role === 'admin'
  }

  public async getAdminAuthor(): Promise<AuthorInterface | null> {
    let user = await User.findOne({ role: "admin" }).exec()
    return user?.author || null
  }

}

export const adminService: AdminService = new AdminService()

