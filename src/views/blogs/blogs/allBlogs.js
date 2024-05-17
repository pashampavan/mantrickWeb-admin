import { Button, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Thumbnail from './thumbnail';
import apiServices from '../../../services/apiServices';
import './blocks.css';
const AllBlogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState({});
  const fetchBlogs = async () => {
    try {
      const response = await apiServices.fetchRealAllBlogs();
      // const response = await axios.get('https://swayam-website-d9b3d-default-rtdb.asia-southeast1.firebasedatabase.app/blogs.json');
      if(response.data!=null)
      {
        setBlogs(response.data);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const blogIds = Object.keys(blogs);

  return (
    <>
      <div style={{ width: "80%", margin: '50px auto' }}>
        <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between' }}>
          <h1>All Blogs</h1>
          <Button
            variant="contained"
            size="small"
            onClick={() => { navigate(`/blogs/add-edit-blog/${'b1'}`) }}
            style={{fontSize:"30px"}}
          >+</Button>
        </div>

        <div id="allblocks">
          {blogIds.map((blogId) => {
            const blog = blogs[blogId];
            console.log(blog);
            return (
              <div key={blogId} className="blog">
                <Thumbnail
                  date={blog.date}
                  title={blog.title.slice(0,30)+(blog.title.length>30?"...":"")}
                  description={blog.iframeSrc}
                  thumbnail={blog.imageUrl}
                  id={blogId} />
                
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AllBlogs;
