const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const bcrypt = require('bcrypt')
const User = require('../models/user')
const helper = require('./test-helper')
require('jest');
const config = require('../utils/config');

beforeAll(async() => {
  console.log('config.MONGODB_URI :>> ', config.MONGODB_URI);
  await mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:true,
    useUnifiedTopology: true
  });
}, 99999)

describe('when there are initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
  
    for (let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      await blogObject.save()
    }
  })
  test('blogs are returned from GET request',async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  },100000)
  
  
  test('unique identifier is `id`', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0]['id']).toBeDefined()
  }, 100000)
  
  test('post new blog', async () => {
    const beforeCount = await Blog.count();
  
    await api
    .post('/api/blogs')
    .send(helper.newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    const titles = response.body.map((r) => r.title)
    expect(response.body).toHaveLength(beforeCount + 1)
    expect(titles).toContain("The Brothers Karamazov")
  })
  
  
  test('default likes to zero', async () => {
    const noLikeBlog = {
      title: "The Pale King",
      author: "David Foster Wallace",
      url: "https://www.goodreads.com/book/show/9443405-the-pale-king"
    }
  
    await api
      .post("/api/blogs")
      .send(noLikeBlog)
      .expect(201)
    
    const response = await api.get("/api/blogs")
    expect(response.body[response.body.length - 1]['likes']).toEqual(0)
  })
  
  test('deletion of a new note', async () => {
    const blogToDel = helper.initialBlogs[0];
    const beforeCount = await Blog.count();
    const resp = await api
     .delete(`/api/blogs/${blogToDel._id}`);

    //  console.log('resp.body :>> ', resp.body);

    const afterCount = await Blog.count()

    expect(afterCount).toEqual(beforeCount - 1)
  })

  test('update a blog', async () => {
    const blogToUpdate = helper.initialBlogs[1]
    const newBlog = {
        "title": "Go To Statement Considered Harmful",
       "author": "Edsger W. Dijkstra",
       "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
       "likes": 0
   }
    const response = await api.put(`/api/blogs/${blogToUpdate._id}`).send(newBlog)
    expect(response.body).toMatchInlineSnapshot(`
Object {
  "__v": 0,
  "_id": "5a422aa71b54a676234d17f8",
  "author": "Edsger W. Dijkstra",
  "likes": 0,
  "title": "Go To Statement Considered Harmful",
  "url": "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
}
`)
  })
 
}) 


describe('when there is initially one user in database', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('bnsdmm',10)
    const user = new User({username: 'gen', passwordHash})
    await user.save()
  },200000)

  test('creation succeeds with a fresh username', async () => {
    const userBefore = await helper.usersInDb()

    const newUser = {
      username: 'cgm',
      name: 'Carrie G',
      password: 'bunengshuo',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const userAfter = await helper.usersInDb()
    expect(userAfter).toHaveLength(userBefore.length + 1)

    const usernames = userAfter.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('get user in test db', async () => {
    const response = await api.get('/api/users')
    expect(response.body[0].username).toContain("gen")

  })

  test('create an user with a username that already exists', async () => {
    const userBefore = await helper.usersInDb
    const duplicatedUser = {
      username: 'gen',
      name: 'Cranberry',
      password: 'bnsdmm1',
    }

    const result = await api.post('/api/users')
      .send(duplicatedUser)
      .expect(400)

    const usersAfter = await helper.usersInDb;
    expect(usersAfter.length).toEqual(userBefore.length)
  })

  test('when the password is in valid', async () => {
    const userBefore = await helper.usersinDb
    const invalidUser = {
      username: 'gen',
      name: 'Cranberry',
      password: '12'
    }
    const result = await api.post('/api/users')
      .send(invalidUser)

    expect(result.body.error).toContain(`password too short`)
  
    const usersAfter = await helper.usersInDb;
    expect(usersAfter.length).toEqual(userBefore.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})