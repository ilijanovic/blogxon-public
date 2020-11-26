import Blog from '../model/blog'
import User from "../model/user"
import { errorService } from './error'
import { utilsService } from './utils'
import { eventEmitter } from '../subscribers/blog'
import mongoose from "mongoose"
import { BlogInterface, BlogQueryInterface } from "../../../types"

class BlogService {

  public async getBlogs(limit: number = 10, skip: number = 0): Promise<Omit<BlogQueryInterface, "content">[]> {
    return await Blog.aggregate([
      { $limit: limit },
      { $skip: skip },
      {
        $lookup: {
          from: User.collection.name,
          localField: "author",
          foreignField: "_id",
          as: "author"
        }
      },
      {
        $unwind: "$author"
      },
      {
        $set: {
          author: "$author.author"
        }
      },
      {
        $project: {
          ips: 0,
          content: 0
        }
      }
    ]).exec()
  }
  public async findBlogById(_id: string | mongoose.Types.ObjectId, statics: Boolean = true): Promise<BlogQueryInterface | undefined> {
    if (statics) {
      eventEmitter.emit('add_ip', { _id })
    }
    if (typeof _id === "string") {
      _id = mongoose.Types.ObjectId(_id)
    }
    try {
      return (await Blog.aggregate([

        { $match: { _id } },

        {
          $lookup: {
            from: User.collection.name,
            localField: "author",
            foreignField: "_id",
            as: "author"
          }
        },
        {
          $unwind: "$author"
        },
        {
          $set: {
            author: "$author.author"
          }
        },
        {
          $project: {
            ips: 0
          }
        }
      ]).exec())[0]
    } catch (err) {
      console.log(err);
      return err
    }
  }
  public async findBlogBySlug(slug: string, statics: Boolean = true): Promise<BlogQueryInterface | undefined> {

    if (statics) {
      eventEmitter.emit('add_ip', { slug })
    }

    return (await Blog.aggregate([
      { $match: { slug } },
      { $limit: 1 },
      {
        $lookup: {
          from: User.collection.name,
          localField: "author",
          foreignField: "_id",
          as: "author"
        }
      },
      {
        $unwind: "$author"
      },
      {
        $set: {
          author: "$author.author"
        }
      },
      {
        $project: {
          ips: 0
        }
      }
    ]).exec())[0]
  }

  public async deleteBlogById(_id: mongoose.Types.ObjectId | string): Promise<Boolean> {
    let blog = await this.findBlogById(_id)
    if (!blog) return false
    let { thumbnail, thumbnail_webp } = blog
    try {
      await Blog.deleteOne({ _id }).exec()
    } catch (err) {
      await errorService.writeErrorLog(err, "service/deleteBlogById")
      return false
    }
    try {
      await Promise.all([
        utilsService.deleteFile('static' + thumbnail),
        utilsService.deleteFile('static' + thumbnail_webp),
      ])
    } catch (err) {
      await errorService.writeErrorLog(err, 'service/deleteBlogById')
      return false
    }
    return true
  }

  public increaseViews(): Promise<any> {
    return Blog.updateMany({},
      [{
        $set: {
          views: { $add: ["$views", { $size: "$ips" }] },
          ips: []
        }
      }]
    ).exec()
  }

  public async getBlogThumbnails(): Promise<string[]> {
    return (await Blog.find({}, { _id: 0, thumbnail: 1 }).exec()).map(({ thumbnail }) => thumbnail)
  }
}



export const blogService: BlogService = new BlogService()


