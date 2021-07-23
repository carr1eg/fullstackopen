const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = reuqest.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})

  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const randomUser = await User.findOne()
  console.log('randomUser :>> ', randomUser);
  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: randomUser._id,
  })
  const savedBlog = await blog.save();
  randomUser.blogs = randomUser.blogs.concat(savedBlog._id)
  await randomUser.save()
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