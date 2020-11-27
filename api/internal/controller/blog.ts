import { blogService } from '../service/blog'
import Blog from '../model/blog'
import { errorService } from '../service/error'
import { imageService } from '../service/image'
import { utilsService } from '../service/utils'
import { NextFunction, Request, Response } from "express"
import { PostUploadInterface } from '../../../types'

class BlogController {
  public async getBlogsHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
    let blogs = await blogService.getBlogs()
    return res.status(200).json(blogs)
  }

  public async uploadBlogHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
    let { title, description, keywords, structuredData, content }: PostUploadInterface = req.body
    let { userId } = res.locals
    let thumbnail = req.file.path
    await imageService.compressImage({ path: thumbnail })
    let webpPath = await imageService.convertToWebp(thumbnail, req.file.filename)
    let thumbnailPath = thumbnail.replace('static', '')
    let blog = new Blog({
      title,
      description,
      keywords: keywords.split(','),
      structuredData,
      content,
      thumbnail: thumbnailPath,
      thumbnail_webp: webpPath,
      author: userId,
      slug: utilsService.convertToSlug(title),
    })
    try {
      await blog.save()
      return res.status(200).json(blog)
    } catch (err) {
      await errorService.writeErrorLog(err, 'uploadBlogHandler')
      console.log(err)
      return res.status(500).json({ message: 'Something went wrong ' })
    }
  }

  public async deleteBlogHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
    let { _id } = req.body
    try {
      await blogService.deleteBlogById(_id)
      return res.status(200).json({ message: 'Blog deleted' })
    } catch (err) {
      await errorService.writeErrorLog(err, 'deleteBlogHandler')
      return res.status(500).json({ message: 'Something went wrong' })
    }
  }

  public async getBlogHandler(req: Request, res: Response, next: NextFunction): Promise<Response> {
    let { _id } = req.params
    try {
      if (!utilsService.isMongoDBId(_id)) return res.status(200).json(null)
      let blog = await blogService.findBlogById(_id)
      return res.status(200).json(blog)
    } catch (err) {
      return res.status(500).json({ message: 'Something went wrong' })
    }
  }

  public async getBlogThumbnails(req: Request, res: Response, next: NextFunction) {
    try {

      let thumbnails = await blogService.getBlogThumbnails()
      return res.status(200).json(thumbnails)

    } catch (err) {
      await errorService.writeErrorLog(err, "getBlogImages")
      return res.status(500).json({ message: "Something went wrong" })
    }
  }
  public async getBlogBySlugHandler(req: Request, res: Response, next: NextFunction) {
    let { slug } = req.params
    try {
      let blog = await blogService.findBlogBySlug(slug)
      return res.status(200).json(blog)
    } catch (err) {
      await errorService.writeErrorLog(err, "getBlogBySlugHandler")
      return res.status(500).json({ message: "Something went wrong" })
    }
  }
}

export const blogController: BlogController = new BlogController()

