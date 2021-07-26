import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Blogform from './components/Blogform'
import Togglable from './components/Togglable'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const blogformRef = useRef()
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
  

  const handleCreate = async (blogData) => { 
    try {
      const blog = await blogService.create(blogData)
      blogformRef.current.toggleVisibility();
      setErrorMessage(`a new blog ${blog.title} by ${blog.author} added`)
        setTimeout(() => {
        setErrorMessage(null)
        }, 5000)
    } catch (exception) {
      setErrorMessage(exception)
        setTimeout(() => {
        setErrorMessage(null)
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
       setErrorMessage("username or password invalid")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setUsername('')
      setPassword('')
    }
  }
 
  const handleLogout = (event) => {
    window.localStorage.removeItem('LoggedBlogAppUser')
    setUser(null)
  }

  const blogform = () => {
    return(
    <Togglable buttonLabel="create blog" ref={blogformRef}>
      <Blogform handleCreate={handleCreate}/> 
   </Togglable>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={errorMessage}/> 
      {user === null && loginForm()} 
      {user !== null && 
      <div>
      <span>{user.name} logged in</span>
      <button onClick={handleLogout}>log out</button>
      <h1>create new</h1>
      </div>
      }
       {user !== null && blogform()}
      {user !== null && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}


const Notification = ({notification}) => {
  if(notification === null){
    return null;
  }
  return(
    <div className="notification">
      {notification}
    </div>
  )
}
export default App