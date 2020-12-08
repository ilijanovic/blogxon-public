import multer from 'multer'
import { config } from '../../../config'
import { utilsService } from '../service/utils'
import { Request } from "express"
const storeThumbnail = multer.diskStorage({
  destination: async function (req: Request, file: Express.Multer.File, cb): Promise<void> {

    let dirExist = await utilsService.directoryExist('static' + config.images_path)
    if (!dirExist) {
      await utilsService.createDirectory('static' + config.images_path)
    }
    dirExist = await utilsService.directoryExist('static' + config.images_webp_path)
    if (!dirExist) {
      await utilsService.createDirectory('static' + config.images_webp_path)
    }
    cb(null, `static${config.images_path}/`)
  },
  filename(req: Request, file: Express.Multer.File, cb): void {
    let [name]: string[] = file.originalname.split('.')
    const uniqueName: string = Date.now() + '-' + name.replace(/ /g, '') + '.png'
    cb(null, uniqueName)
  },
})

const storeBadge = multer.diskStorage({
  destination: async function (req: Request, file: Express.Multer.File, cb): Promise<void> {
    let dirExist = await utilsService.directoryExist("static" + config.badge_path)
    if (!dirExist) {
      await utilsService.createDirectory("static" + config.badge_path)
    }
    cb(null, `static${config.badge_path}`)
  },
  filename(req: Request, file: Express.Multer.File, cb): void {
    let [name]: string[] = file.originalname.split(".")
    const uniqueName: string = Date.now() + "-" + name.replace(/ /g, "") + ".png"
    cb(null, uniqueName)
  }

})

const storeProfileImage = multer.diskStorage({
  destination: async function (req: Request, file: Express.Multer.File, cb): Promise<void> {
    let dirExist = await utilsService.directoryExist("static" + config.profile_path)
    if (!dirExist) {
      await utilsService.createDirectory("static" + config.profile_path)
    }
    cb(null, `static${config.profile_path}`)
  },
  filename(req: Request, file: Express.Multer.File, cb): void {
    let [name]: string[] = file.originalname.split(".")
    const uniqueName: string = Date.now() + "-" + name.replace(/ /g, "") + ".png"
    cb(null, uniqueName)

  }
})

export const uploadThumbnailImage: multer.Multer = multer({ storage: storeThumbnail })
export const uploadBadge: multer.Multer = multer({ storage: storeBadge })
export const uploadProfile: multer.Multer = multer({ storage: storeProfileImage })