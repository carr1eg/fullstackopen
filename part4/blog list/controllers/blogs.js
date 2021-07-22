const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0
  })
  const savedBlog = await blog.save();
  response.status(201).json(savedBlog)
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end();
})

blogRouter.put('/:id', async (request, response) => {
  console.log('request.body :>> ', request.body);

  const blog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new:true, lean:true})
  response.status(200).json(updatedBlog)
})


module.exports = blogRouter;