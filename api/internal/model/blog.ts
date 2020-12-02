import mongoose from 'mongoose'
import { conn } from '../config/connection'
import { config } from '../../../config'
import { BlogInterface } from "../../../types"
const blogSchema = new mongoose.Schema({

  title: {
    type: String,
    trim: true,
    maxlength: config.title_length,
    default: ""
  },
  description: {
    type: String,
    trim: true,
    maxlength: config.description_length,
    default: ""
  },
  content: {
    type: String,
    trim: true,
    required: true,
    default: ""
  },
  thumbnail: {
    type: String,
    required: true,
    trim: true,
  },
  thumbnail_webp: {
    type: String,
    required: true,
    trim: true,
  },
  likes: {
    type: Number,
    required: true,
    default: 0,
  },
  views: {
    type: Number,
    required: true,
    default: 0,
  },
  structuredData: {
    type: String,
    required: true,
    default: "blog"
  },
  keywords: {
    type: Array,
    required: true,
    default: []
  },
  ips: {
    type: Array,
    required: true,
    default: [],
  },
  created: {
    type: Date,
    required: true,
    default: Date.now,
  },
  author: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    default: ""
  },
  updated: {
    type: Date,
    required: true,
    default: Date.now,
  },
  enabled: {
    type: Boolean,
    required: true,
    default: true
  }
})

export default conn.model<BlogInterface>('Blog', blogSchema)

