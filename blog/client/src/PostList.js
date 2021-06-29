import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentList from './CommentList';

const PostList = () => {
  const [posts, setPosts] = useState({});

  // fetch post data from post service
  const fetchPosts = async () => {
    const res = await axios.get('http://localhost:4002/posts');
    setPosts(res.data);
  };

  // fetch post only when the page is rendered
  useEffect(() => {
    fetchPosts();
  }, []);

  // array of post object
  const renderedPosts = Object.values(posts).map(post => {
    return (
      <div className='card' styles={{ width: '30%', marginBottom: '20px' }} key={post.id}>
        <div className='card-body'>
          <h3>{post.title}</h3>
          <CommentList comments={post.comments} />
          <CommentCreate postId={post.id} />
        </div>
      </div>
    );
  });

  return <div className='d-flex flex-row flex-wrap jusity-content-between'>{renderedPosts}</div>;
};

export default PostList;
