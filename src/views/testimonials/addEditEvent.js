import React, { useEffect, useState } from 'react';
import { TextField, Button, Paper, Typography, Box, IconButton, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Image,FormatQuote, Subtitles, Title } from '@mui/icons-material';
import Alert from '@mui/material/Alert/Alert';
import axios from 'axios';
import { v4 } from "uuid";
import { useParams, useHistory, useNavigate } from 'react-router-dom';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase';
import apiServices from '../../services/apiServices';

const AddEditLanding = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogContent, setBlogContent] = useState([]);
  const [eventTitle, setEventTitle] = useState('');
  const [eventUrl, setEventUrl] = useState('');
  const [eventImageOne, setEventImageOne] = useState(null);
  const [eventDate, setEventDate] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Default to success

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleSaveEvent = async () => {
    if (eventTitle === '' || eventImageOne === '') {
      showSnackbar('Please fill in all mandatory fields (Event Title, Event URL, and Event Date) before saving.', 'error');
      return;
    }

    try {
      var imageOneURL = "";
      if(eventImageOne.slice(0, 8) === "https://"){
        imageOneURL = eventImageOne;
      }
      else
      {
        const imageOneRef = ref(storage, `testimonials/${eventImageOne.name}` + v4());
        await uploadBytes(imageOneRef, eventImageOne);
        imageOneURL = await getDownloadURL(imageOneRef);
      }
      const updatedContent = [];
      for (const item of blogContent) {
        if ('image' in item) {
          var imageURL = "";
          if((item.image).slice(0, 8) === "https://"){
            imageURL = item.image;
          }
          else
          {
            const imageRef = ref(storage, `testimonials/${item.image.name}` + v4());
            await uploadBytes(imageRef, item.image);
            imageURL = await getDownloadURL(imageRef);
          }
          updatedContent.push({ image: imageURL });
        } else {
          updatedContent.push(item);
        }
      }

      const newEvent = {
        title: eventTitle,
        youtubeUrl: eventUrl,
        imageUrl: imageOneURL,
        // date: eventDate,
        id: id || v4(),
        description:eventDescription,
        // blogContent:updatedContent
      };

      if (id === "b1") {
        const response = await apiServices.saveTestimonials(newEvent);
        // const response = await axios.post(`https://swayam-website-d9b3d-default-rtdb.asia-southeast1.firebasedatabase.app/events.json`, newEvent); 
        if (response.status === 200) {
          showSnackbar('Event saved successfully!', 'success');
        } else {
          showSnackbar('Failed to save event.', 'error');
        }
        setEventTitle('');
        setEventUrl('');
        setEventImageOne(null);
        setEventDate('');
        setEventDescription('');
        setBlogContent([]);
      } else {
        await apiServices.updateTestimonials(id, newEvent);
        // await axios.put(`https://swayam-website-d9b3d-default-rtdb.asia-southeast1.firebasedatabase.app/events/${id}.json`, newEvent); 
        showSnackbar('Event updated successfully!', 'success');
      }

    } catch (error) {
      console.error('Error saving/updating event:', error);
      showSnackbar('An error occurred while saving/updating the event.', 'error');
    }
  };

  useEffect(() => {
    console.log(eventDate)
  }, [eventDate])
  
  const [data, setData] = useState(null);
  const handleContentChange = (field, value, index) => {
    const updatedContent = [...blogContent];
    console.log(JSON.stringify(value));
    const content={[field]:value};
    if(field!='image')
    {
      console.log('not image');
      const content = { [field]: value.trim() };
    }
    updatedContent[index] = content;
    setBlogContent(updatedContent);
  };
  const handleDeleteContent = (index) => {
    const updatedContent = [...blogContent];
    updatedContent.splice(index, 1);
    setBlogContent(updatedContent);
  };
  useEffect(() => {
    if (id !== "b1") {
      const fetchLandingd = async () => {
        try {
          const response = await apiServices.fetchLanding(id);
          // const response = await axios.get(`https://swayam-website-d9b3d-default-rtdb.asia-southeast1.firebasedatabase.app/events/${id}.json`); // Replace with your event API URL
          setData(response.data)
          setEventTitle(response.data.title);
          setEventUrl(response.data.youtubeUrl);
          setEventImageOne(response.data.imageUrl);
          // setEventDate(new Date(response.data.eventdate).toISOString().split('T')[0]);
          setEventDescription(response.data.description);
          // setBlogContent(response.data.blogContent);
        } catch (error) {
          console.error('Error fetching event:', error);
        }
      };
      fetchLandingd();
    }
  }, [id]);

  return (
    <>
      <Paper elevation={3} sx={{ p: 2, maxWidth: '80%', margin: '150px auto' }}>
        <Typography variant="h4">{id !== "b1" ? 'Edit' : 'Add'} Testimonial</Typography>
        <Box my={1}>
          <TextField
            fullWidth
            label="Name"
            variant="outlined"
            value={eventTitle}
            onChange={(e) => setEventTitle(e.target.value)}
            required
          />
        </Box>
        <Box my={1}>
          <TextField
            fullWidth
            label="Review"
            variant="outlined"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            required
          />
        </Box>
        <Box my={2}>
          <TextField
            fullWidth
            type="number"
            label="Number of stars"
            variant="outlined"
            value={eventUrl}
            onChange={(e) => setEventUrl(e.target.value)}
            required
          />
        </Box>
        <Box my={2}>
          <Typography variant="subtitle1"><b>Image:</b></Typography>

            {id === 'b1' ? (
            <input type="file" accept="image/*" required onChange={(e) => setEventImageOne(e.target.files[0])} />
            ) : (
            <img src={eventImageOne} alt="Thumbnail" width={'40%'} />
            )}
          
          <br/><br/>
        </Box>

        <Box my={2}>
          <Button variant="contained"  style={{margin:"5px"}} onClick={handleSaveEvent}>
            {id !== "b1" ? 'Update Testimonials' : 'Save Testimonials'}
          </Button>
        </Box>
      </Paper>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddEditLanding;
