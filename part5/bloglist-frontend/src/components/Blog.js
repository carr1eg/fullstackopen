import React, { useEffect, useState } from 'react';
import blogService from '../services/blogs';

const Blog = ( { blog, deleteBlog } ) => {
  const [blogview, setBlogview] = useState(false);

  const handleView = () => {
    setBlogview(!blogview);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div style ={blogStyle} className='blog'>
      {blog.title} {blog.author}
      {blogview === false && <button onClick ={handleView}>view</button>}
      {blogview !== false && <button onClick ={handleView}>hide</button>}
      {blogview !== false && <div>url:{blog.url}</div>}
      {blogview !== false && <BlogDetail id={blog.id} deleteBlog={deleteBlog}/>}

    </div>
  );};

export default Blog;

const BlogDetail = ({ id, deleteBlog }) => {
  const [oneBlog, setOneBlog] = useState(null);
  const [likeVisible, setlikeVisible] = useState(true);

  useEffect(() => {
    (async () => {
      const blog = await blogService.getOne(id);
      setOneBlog(blog);
    })();

  }, []);

  const handleLike = async () => {
    const likedBlog = {
      user: oneBlog.user.id,
      likes: oneBlog.likes + 1,
      author: oneBlog.author,
      url: oneBlog.url,
      title: oneBlog.title,
    };
    console.log(likedBlog);
    setOneBlog(await blogService.update(id, likedBlog));
    setlikeVisible(false);
  };

  const handleDelete = async () => {
    const response = await deleteBlog(id);
    console.log('response :>> ', response);
  };
  return (

    <div>
      {oneBlog !== null &&
      <div>
        <div>id: {id}</div>
        <span>likes: {oneBlog.likes}
          <button style={{ display: likeVisible ? 'inline': 'none' }} onClick={handleLike}>like</button>
        </span>
        <div > user: {oneBlog.user.name}</div>
        <button onClick={handleDelete}>delete</button>
      </div>}

    </div>
  );
};