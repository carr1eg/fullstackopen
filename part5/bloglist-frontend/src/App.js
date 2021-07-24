import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'

import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const [user, setUser] = useState(null)

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
  const blogForm = () => (
    <div>
    <form onSubmit={handleCreate}>
      <div>
        title:
          <input
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
          <input
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
          <input
          type="text"
          value={url}
          name="URL"
          onChange={({ target }) => setURL(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>  
    </div>    
  )

  const handleCreate = async (event) => {
    event.preventDefault()
    try {
      const blog = await blogService.create({
        title, author, url
      })
    } catch (exception) {
      console.log('errrrrr in blog creation')
      setTimeout(() => {
        console.log(null)
      }, 5000)
    }
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('LoggedBlogAppUser')
    if (loggedUserJSON) { //if local storage exists
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])//empty arr --> fires at every render


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'LoggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
      setTimeout(() => {
        console.log(null)
      }, 5000)
    }
  }
 
  const handleLogout = (event) => {
    window.localStorage.removeItem('LoggedBlogAppUser')
    setUser(null)
  }

  return (
    <div>
      <h2>blogs</h2>

      {user === null && loginForm()} 
      {user !== null && 
      <div>
      <span>{user.name} logged in</span>
      <button onClick={handleLogout}>log out</button>
      <h1>create new</h1>
      </div>
      }
       {user !== null && blogForm()}
      {user !== null && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App