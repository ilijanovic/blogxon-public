import { Router } from 'express'
import { blogService } from '../blogxon'

let router = Router()

// Write your custom GET REST API endpoints here
// Demo API endpoint for getting 1 blog
router.get('/getBlogs', async (req, res) => {
  let blogs = await blogService.getBlogs()
  res.status(200).json(blogs)
})

export default router
