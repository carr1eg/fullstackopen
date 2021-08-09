import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blogform = ({ handleCreate }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setURL] = useState('');

  const onFormSubmit = (e) => {
    e.preventDefault();
    handleCreate({
      url,
      title,
      author,
    });
  };

  return(
    <div>
      <form onSubmit={onFormSubmit}>
        <div>
        title:
          <input
            type="text"
            name="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
        author:
          <input
            type="text"
            name="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </div>
        <div>
        url:
          <input
            name="URL"
            type="text"
            value={url}
            onChange={(e) => setURL(e.target.value)}
          />
        </div>
        <button id='submit-button' type="submit">create</button>
      </form>
    </div>
  );
};
Blogform.propTypes = {
  handleCreate: PropTypes.func.isRequired
};
export default Blogform;