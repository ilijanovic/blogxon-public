

import { Inject } from "@nuxt/types/app"
import { BlogQueryInterface } from "~/types"
import { config } from "@/config"
import { Context } from "@nuxt/types"
import mongoose from "mongoose"

export default function (context: Context, inject: Inject) {
  inject('blogxon', {
    getBlogs: (): Promise<Omit<BlogQueryInterface, "content">[]> => fetch(`http://localhost:${config.port}/api/internal/blogs`).then(res => res.json()),
    getBlogById: (_id: string | mongoose.Types.ObjectId): Promise<BlogQueryInterface> => fetch(`http://localhost:${config.port}/api/internal/getBlog/${_id}`).then(res => res.json()),
    getBlogBySlug: (slug: string): Promise<BlogQueryInterface> => fetch(`http://localhost:${config.port}/api/internal/getBlogBySlug/${slug}`).then(res => res.json())
  })
}
