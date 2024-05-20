import React, { useEffect, useState } from 'react';
import { TextField,Button, Paper, Typography, Box, IconButton, Snackbar, duration } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DatePicker } from '@mui/lab';
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

const AddEditBlog = () => {
  const { id } = useParams();
  const [blogTitle, setBlogTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [course, setCourse] = useState('');
  const [duration, setDuration] = useState('');
  const [iframe, setIframe] = useState(null);
  const [blogDescription, setBlogDescription] = useState('');
  const [blogThumbnail, setBlogThumbnail] = useState(null);
  const [blogContent, setBlogContent] = useState([]);

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // Default to success

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleDeleteContent = (index) => {
    const updatedContent = [...blogContent];
    updatedContent.splice(index, 1);
    setBlogContent(updatedContent);
  };

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

  const handleSaveBlog = async () => {
    if (blogTitle === ''  || iframe === null) {
      showSnackbar('Please fill in all mandatory fields (Blog Title, Blog Description, and Blog Thumbnail) before saving.', 'error');
      return;
    }

    try {
      // var thumbnailURL = "";
      // if(blogThumbnail.slice(0, 8) === "https://"){
      //   thumbnailURL = blogThumbnail;
      // }
      // else
      // {
      //   const thumbnailRef = ref(storage, `studentcorner/${blogThumbnail.name}` + v4());
      //   await uploadBytes(thumbnailRef, blogThumbnail);
      //   thumbnailURL = await getDownloadURL(thumbnailRef);
      // }

      const updatedContent =blogContent;
      // for (const item of blogContent) {
      //   if ('image' in item) {
      //     var imageURL = "";
      //     if((item.image).slice(0, 8) === "https://"){
      //       imageURL = item.image;
      //     }
      //     else
      //     {
      //       const imageRef = ref(storage, `studentcorner/${item.image.name}` + v4());
      //       await uploadBytes(imageRef, item.image);
      //       imageURL = await getDownloadURL(imageRef);
      //     }
      //     updatedContent.push({ image: imageURL });
      //   } else {
      //     updatedContent.push(item);
      //   }
      // }

      const newBlog = {
        title: blogTitle,
        iframeSrc: iframe,
        course:course,
        duration:duration,
        date:date,
        blogcontent: updatedContent,
      };

      if (id === 'b1') {
        const response = await apiServices.saveStudentcorner(newBlog);
        // const response = await axios.post('https://swayam-website-d9b3d-default-rtdb.asia-southeast1.firebasedatabase.app/blogs.json', newBlog);
        if (response.status === 200) {
          setBlogTitle('');
          setIframe(null);
          setDuration(null);
          setDate(null);
          setCourse(null);
          setBlogContent([]);
          showSnackbar('Blog saved successfully!', 'success');
        } else {
          showSnackbar('Failed to save blog.', 'error');
        }
      } else {
        await apiServices.updateStudentcorner(id, newBlog);
        // await axios.put(`https://swayam-website-d9b3d-default-rtdb.asia-southeast1.firebasedatabase.app/blogs/${id}.json`, newBlog);
        showSnackbar('Blog updated successfully!', 'success');
      }
    } catch (error) {
      console.error('Error saving/updating blog:', error);
      showSnackbar('An error occurred while saving/updating the blog.', 'error');
    }
  };

  useEffect(() => {
    const fetchStudentcorner = async () => {
      try {
        const response = await apiServices.fetchStudentcorner(id);
        // const response = await axios.get(`https://swayam-website-d9b3d-default-rtdb.asia-southeast1.firebasedatabase.app/blogs/${id}.json`);
        const blogData = response.data;
        // Set the fetched data in the state
        setBlogTitle(blogData.title);
        setIframe(blogData.iframeSrc);
        setDuration(blogData.duration);
        setCourse(blogData.course);
        setDate(blogData.date);
        if(blogData.blogcontent)
        setBlogContent(blogData.blogcontent);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };
    if (id !== 'b1') {
      fetchStudentcorner();
    }
  }, [id]);


  return (
    <>
    <Paper elevation={3} sx={{ p: 2, maxWidth: '80%', margin: '150px auto' }}>
      <Typography variant="h4">{id === 'b1' ? 'Add' : 'Edit'} Student Corner Details</Typography>
      <Box my={1}>
        <TextField
          fullWidth
          label="Name"
          variant="outlined"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
          required
        />
      </Box>
      <Box my={1}>
        <TextField
          fullWidth
          label="Course"
          variant="outlined"
          value={course}
          onChange={(e) => setCourse(e.target.value)}
          required
        />
      </Box>
      <Box my={1}>
        <TextField
          fullWidth
          label="duration"
          variant="outlined"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          required
        />
      </Box>
      <Box my={2}>
            <TextField
                label="Joined Date"
                variant="outlined"
                type="date"
                defaultValue={new Date()}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                InputLabelProps={{
                    shrink: true,
                }}
                helperText="Please select the event date"
            />
        </Box>
      <Box my={2}>
        <TextField
          fullWidth
          InputLabelProps={{
            shrink: true,
        }}
          label="Video iframe source"
          variant="outlined"
          rows={1}
          value={iframe}
          onChange={(e) => setIframe(e.target.value)}
          required
        />
      </Box>
      <Box my={2}>
      <Box my={2}>
        <DatePicker
          label="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          renderInput={(params) => <TextField {...params} />}
        />
      </Box>
     </Box>
      <Box my={2}>
        {blogContent.length > 0 && blogContent.map((item, index) => (
          <div key={index}>
            {'iframe' in item && (
              <div>
                <Box display="block" alignItems="center" justifyContent="space-between" mb={2}>
                  <Typography>Iframe:</Typography>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      variant="filled"
                      fullWidth
                      value={item.iframe}
                      onChange={(e) => handleContentChange('iframe', e.target.value, index)}
                      InputProps={{ disableUnderline: true }}
                    />
                    <IconButton onClick={() => handleDeleteContent(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </Box>
              </div>
            )}

          </div>
        ))}
      </Box>
      <Box my={2}>
        <Button variant="contained" size="small" onClick={() => handleContentChange('iframe', '', blogContent.length)} startIcon={<Title />} sx={{ mr: 1 }}>
          Add A Video Frame
        </Button>
      </Box>
      <Box my={2}>
        <Button variant="contained" onClick={handleSaveBlog}>
          {id === 'b1' ? 'Save Video' : 'Update Video'}
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

export default AddEditBlog;
