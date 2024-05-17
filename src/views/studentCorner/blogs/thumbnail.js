import React from 'react';
import { Card, CardContent, CardActions, Typography, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Edit, Delete } from '@mui/icons-material';
import axios from 'axios';
import { storage } from "../../../firebase";
import { getStorage, ref, deleteObject } from 'firebase/storage';
const Thumbnail = ({ date, title, description, thumbnail, id }) => {
  const navigate = useNavigate();

  // Function to handle blog deletion
  const handleDeleteBlog = async (blogId,imageUrl) => {
    try {
        await axios.delete(
          `https://mantrickweb-default-rtdb.firebaseio.com/studentcorner/${blogId}.json`
        );
        window.location.reload();
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

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
    navigate(`/studentcorner/add-edit-blog/${id}`);
  };

  return (
    <Card variant="outlined" sx={cardStyle} style={{width:"auto",height:"auto"}}>
      <CardContent style={{position:"relative", fontFamily: 'Proxima Nova'}}>
        {/* <img src={thumbnail} style={{ width: '100%', height: '150px', objectFit: 'cover' }} alt="Blog Thumbnail" /> */}
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
