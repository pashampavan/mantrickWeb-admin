import React, { useEffect, useState } from 'react';
import { TextField, Button, Paper, Typography, Box, IconButton, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormatQuote, Image, Subtitles, Title } from '@mui/icons-material';
import Alert from '@mui/material/Alert/Alert';
import axios from 'axios'
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../../firebase";
import { v4 } from "uuid";
import { useParams } from 'react-router-dom';
import apiServices from '../../../services/apiServices';

const AddEditGallary = () => {
  const { id } = useParams();
  const [blogTitle, setBlogTitle] = useState('');
  const [blogThumbnail, setBlogThumbnail] = useState(null);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Default to success

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };



  const handleSaveBslog = async () => {
    if (blogTitle === '' ||  blogThumbnail === null) {
      showSnackbar('Please fill in all mandatory fields (Blog Title, Blog Description, and Blog Thumbnail) before saving.', 'error');
      return;
    }

    try {
      var thumbnailURL = "";
      if(blogThumbnail.slice(0, 8) === "https://"){
        thumbnailURL = blogThumbnail;
      }
      else
      {
        const thumbnailRef = ref(storage, `gallary/${blogThumbnail.name}` + v4());
        await uploadBytes(thumbnailRef, blogThumbnail);
        thumbnailURL = await getDownloadURL(thumbnailRef);
      }


      const newBlog = {
        title: blogTitle,
        date: new Date().toISOString(),
        imageUrl: thumbnailURL
      };

      if (id === 'b1') {
        const response = await apiServices.saveClient(newBlog);
        // const response = await axios.post('https://swayam-website-d9b3d-default-rtdb.asia-southeast1.firebasedatabase.app/blogs.json', newBlog);
        if (response.status === 200) {
          setBlogTitle('');
          setBlogThumbnail(null);
          showSnackbar('Blog saved successfully!', 'success');
        } else {
          showSnackbar('Failed to save blog.', 'error');
        }
      } else {
        await apiServices.updateClient(id, newBlog);
        // await axios.put(`https://swayam-website-d9b3d-default-rtdb.asia-southeast1.firebasedatabase.app/blogs/${id}.json`, newBlog);
        showSnackbar('Blog updated successfully!', 'success');
      }
    } catch (error) {
      console.error('Error saving/updating blog:', error);
      showSnackbar('An error occurred while saving/updating the blog.', 'error');
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await apiServices.fetchClient(id);
        // const response = await axios.get(`https://swayam-website-d9b3d-default-rtdb.asia-southeast1.firebasedatabase.app/blogs/${id}.json`);
        const blogData = response.data;
        // Set the fetched data in the state
        setBlogTitle(blogData.title);
        setBlogThumbnail(blogData.imageUrl);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };
    if (id !== 'b1') {
      fetchBlog();
    }
  }, [id]);


  return (
    <>
    <Paper elevation={3} sx={{ p: 2, maxWidth: '80%', margin: '150px auto' }}>
      <Typography variant="h4">{id === 'b1' ? 'Add' : 'Edit'} Client</Typography>
      <Box my={1}>
        <TextField
          fullWidth
          label="Client Title"
          variant="outlined"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
          required
        />
      </Box>
      <Box my={2}>
        <Typography variant="subtitle1">Client Thumbnail:</Typography>
        {id === 'b1' ? (
          <input type="file" accept="image/*" required onChange={(e) => setBlogThumbnail(e.target.files[0])} />
        ) : (
          <img src={blogThumbnail} alt="Thumbnail" width={'40%'} />
        )}
      </Box>

      <Box my={2}>
        <Button variant="contained" onClick={handleSaveBslog}>
          {id === 'b1' ? 'Save Client' : 'Update Client'}
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

export default AddEditGallary;
