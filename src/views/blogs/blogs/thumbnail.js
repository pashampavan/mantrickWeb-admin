import React,{useEffect,useState} from 'react';
import { Card, CardContent, CardActions, Typography, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import { storage } from "../../../firebase";
import { getStorage, ref, deleteObject } from 'firebase/storage';
import apiServices from '../../../services/apiServices';
import { async } from '@firebase/util';
const Thumbnail = ({ date, title, description, thumbnail, id }) => {
  const navigate = useNavigate();
  const [blogContent, setBlogContent] = useState([]);
  const [refresh, setRefresh] = useState(1);
  // Function to handle blog deletion
  const handleDeleteBlog = async (blogId,imageUrl) => {
    try {
      // Delete the blog from the database
      var imageRef = ref(storage, imageUrl)
      // storageRef.delete()
      deleteObject(imageRef)
      .then(async () => {
        del(blogContent,0).then(async ()=>{
          await axios.delete(
            `https://mantrickweb-default-rtdb.firebaseio.com/realblogs/${blogId}.json`
          );
          navigate(`/blogs`);
        });
      })
      .catch((error) => {
        del(blogContent,0).then(async ()=>{
          await axios.delete(
            `https://mantrickweb-default-rtdb.firebaseio.com/realblogs/${blogId}.json`
          );
          navigate(`/blogs`);
        });
          console.log("Failed to delete image: ", error)
      })
      
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };
  const del=async(blogContent,i)=>{
    if(blogContent.length===i)
    return;
    if('image' in blogContent[i])
    {
      var imageRef = ref(storage, blogContent[i].image);
      await deleteObject(imageRef).then((blogContent)=>{
      del(blogContent,i+1);
    });
  }
  await del(blogContent,i+1);
  }
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };

  const originalDateString = date;
  const formattedDate = formatDate(originalDateString);

  // Define fixed dimensions for the card
  const cardStyle = {
    width: '300px', // Fixed width
    height: '320px', // Fixed height // Adjust as needed
    
  };

  // Style for the description text
  const descriptionStyle = {
    fontSize: "13px",
    margin: "0",
    padding: "0 0 0 5px",
    textAlign: "justify",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: "1", 
            LineClamp: "1", 
    WebkitBoxOrient: "vertical",
    fontFamily: 'Lexend Deca, sans-serif',
    textOverflow: "ellipsis",
    color:"rgba(51, 80, 97, 0.7)",
  };

  const handleEditBlog = () => {
    navigate(`/blogs/add-edit-blog/${id}`);
  };
  useEffect(() => {
      const fetchBlog = async () => {
        try {
          await apiServices.fetchRealBlog(id).then((response)=>{
            const blogData = response.data;
            if(blogData.blogcontent)
            setBlogContent(blogData.blogcontent);
          });
          // const response = await axios.get(`https://swayam-website-d9b3d-default-rtdb.asia-southeast1.firebasedatabase.app/blogs/${id}.json`);
          // Set the fetched data in the state
        } catch (error) {
          console.error('Error fetching blog:', error);
        }
      
      fetchBlog();
    }
  },[]);
  return (
    <Card variant="outlined" sx={cardStyle} style={{width:"auto",height:"auto"}}>
      <CardContent style={{position:"relative", fontFamily: 'Proxima Nova',}}>
        <img src={thumbnail} style={{ width: '100%', height: '150px', objectFit: 'cover' }} alt="Blog Thumbnail" />
        <Typography variant="subtitle2" color="textSecondary" gutterBottom style={{ marginTop: '10px' }}>
          {formattedDate}
        </Typography>
        <Typography variant="h6" component="div" style={{ marginTop: '10px' }}>
          <b>{title}</b>
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', marginTop: '0px' }}>
          <IconButton onClick={handleEditBlog}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDeleteBlog(id,thumbnail)}>
            <Delete />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
};

export default Thumbnail;
