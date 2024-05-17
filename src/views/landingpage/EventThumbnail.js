import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import {CardActions, Box, IconButton } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Edit, Delete } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { storage } from "../../firebase";
import { getStorage, ref, deleteObject } from 'firebase/storage';
const EventThumbnail = ({ title, url, date, imageOne, imageTwo, id ,eventDescription}) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate(`/landingpage/add-edit-landing/${id}`);
  };
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

  const handleDeleteLanding = async (eventId,imageUrl) => {
    try {
      // Delete the blog from the database
      const imageRef = ref(storage, imageUrl)
      // storageRef.delete()
      deleteObject(imageRef)
      .then(async () => {
        await axios.delete(
          `https://mantrickweb-default-rtdb.firebaseio.com//landingpage/${eventId}.json`
        );
        window.location.reload();
      })
      .catch(async (error) => {
        await axios.delete(
          `https://mantrickweb-default-rtdb.firebaseio.com//landingpage/${eventId}.json`
        );
        window.location.reload();
          console.log("Failed to delete image: ", error)
      })
      
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };
  return (
    <Card 
    >
      <CardActionArea id="Card">
        <img src={imageOne} alt={title} style={{ width: '100%',height: "30vh" }} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" style={descriptionStyle}>
            <b>
              {title}
              </b>
          </Typography>
          <Typography variant="body2" color="textSecondary" style={descriptionStyle}>
            {date}
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'end', alignItems: 'center', marginTop: '0px' }}>
          <IconButton onClick={handleCardClick}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => handleDeleteLanding(id,imageOne)}>
            <Delete />
          </IconButton>
        </div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default EventThumbnail;
