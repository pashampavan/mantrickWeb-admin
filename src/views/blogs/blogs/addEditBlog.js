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

const AddEditBlog = () => {
  const { id } = useParams();
  const [blogTitle, setBlogTitle] = useState('');
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
    if (blogTitle === '' || blogDescription === '' || blogThumbnail === null) {
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
        const thumbnailRef = ref(storage, `blogs/${blogThumbnail.name}` + v4());
        await uploadBytes(thumbnailRef, blogThumbnail);
        thumbnailURL = await getDownloadURL(thumbnailRef);
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
            const imageRef = ref(storage, `images/${item.image.name}` + v4());
            await uploadBytes(imageRef, item.image);
            imageURL = await getDownloadURL(imageRef);
          }
          updatedContent.push({ image: imageURL });
        } else {
          updatedContent.push(item);
        }
      }

      const newBlog = {
        title: blogTitle,
        date: new Date().toISOString(),
        iframeSrc: blogDescription,
        imageUrl: thumbnailURL,
        blogcontent: updatedContent,
      };

      if (id === 'b1') {
        const response = await apiServices.saveRealBlog(newBlog);
        // const response = await axios.post('https://swayam-website-d9b3d-default-rtdb.asia-southeast1.firebasedatabase.app/blogs.json', newBlog);
        if (response.status === 200) {
          setBlogTitle('');
          setBlogDescription('');
          setBlogThumbnail(null);
          setBlogContent([]);
          showSnackbar('Blog saved successfully!', 'success');
        } else {
          showSnackbar('Failed to save blog.', 'error');
        }
      } else {
        await apiServices.updateRealBlog(id, newBlog);
        // await axios.put(`https://swayam-website-d9b3d-default-rtdb.asia-southeast1.firebasedatabase.app/blogs/${id}.json`, newBlog);
        showSnackbar('Blog updated successfully!', 'success');
      }
    } catch (error) {
      console.error('Error saving/updating blog:', error);
      showSnackbar('An error occurred while saving/updating the blog.', 'error');
    }
  };

  useEffect(() => {
    if (id !== 'b1') {
      const fetchBlog = async () => {
        try {
          await apiServices.fetchRealBlog(id).then((response)=>{
            const blogData = response.data;
            setBlogTitle(blogData.title);
            setBlogDescription(blogData.iframeSrc);
            setBlogThumbnail(blogData.imageUrl);
            if(blogData.blogcontent)
            setBlogContent(blogData.blogcontent);
          });
          // const response = await axios.get(`https://swayam-website-d9b3d-default-rtdb.asia-southeast1.firebasedatabase.app/blogs/${id}.json`);
          // Set the fetched data in the state
        } catch (error) {
          console.error('Error fetching blog:', error);
        }
      };
      fetchBlog();
    }
  }, [id]);


  return (
    <>
    <Paper elevation={3} sx={{ p: 2, maxWidth: '80%', margin: '150px auto' }}>
      <Typography variant="h4">{id === 'b1' ? 'Add' : 'Edit'} Blog Details</Typography>
      
      <Box my={1}>
        <TextField
          fullWidth
          label="Movie Title"
          variant="outlined"
          value={blogTitle}
          onChange={(e) => setBlogTitle(e.target.value)}
          required
        />
      </Box>
      <Box my={2}>
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          multiline
          rows={4}
          value={blogDescription}
          onChange={(e) => setBlogDescription(e.target.value)}
          required
        />
      </Box>
      <Box my={2}>
        <Typography variant="subtitle1">Blog Thumbnail:</Typography>
        {id === 'b1' ? (
          <input type="file" accept="image/*" required onChange={(e) => setBlogThumbnail(e.target.files[0])} />
        ) : (
          <img src={blogThumbnail} alt="Thumbnail" width={'40%'} />
        )}
      </Box>
      <Box my={2}>
        {blogContent &&  blogContent.length > 0 && blogContent.map((item, index) => (
          <div key={index}>
            {'heading' in item && (
              <div>
                <Box display="block" alignItems="center" justifyContent="space-between" mb={2}>
                  <Typography>Heading:</Typography>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      variant="filled"
                      fullWidth
                      value={item.heading}
                      onChange={(e) => handleContentChange('heading', e.target.value, index)}
                      InputProps={{ disableUnderline: true }}
                    />
                    <IconButton onClick={() => handleDeleteContent(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </Box>
              </div>
            )}
            {'subheading' in item && (
              <div>
                <Box display="block" alignItems="center" justifyContent="space-between" mb={2}>
                  <Typography>Sub Heading:</Typography>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      variant="filled"
                      fullWidth
                      value={item.subheading}
                      onChange={(e) => handleContentChange('subheading', e.target.value, index)}
                      InputProps={{ disableUnderline: true }}
                    />
                    <IconButton onClick={() => handleDeleteContent(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </Box>
              </div>
            )}
            {'paragraph' in item && (
              <div>
                <Box display="block" alignItems="center" justifyContent="space-between" mb={2}>
                  <Typography>Paragraph:</Typography>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      variant="filled"
                      multiline
                      rows={4}
                      fullWidth
                      value={item.paragraph}
                      onChange={(e) => handleContentChange('paragraph', e.target.value, index)}
                      InputProps={{ disableUnderline: true }}
                    />
                    <IconButton onClick={() => handleDeleteContent(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </Box>
              </div>
            )}
            {'quote' in item && (
              <div>
                <Box display="block" alignItems="center" justifyContent="space-between" mb={2}>
                  <Typography>Quote:</Typography>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      variant="filled"
                      fullWidth
                      value={item.quote}
                      onChange={(e) => handleContentChange('quote', e.target.value, index)}
                      InputProps={{ disableUnderline: true }}
                    />
                    <IconButton onClick={() => handleDeleteContent(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </Box>
              </div>
            )}
            {'note' in item && (
              <div>
                <Box display="block" alignItems="center" justifyContent="space-between" mb={2}>
                  <Typography>Note+:</Typography>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                      variant="filled"
                      fullWidth
                      value={item.note}
                      onChange={(e) => handleContentChange('note', e.target.value, index)}
                      InputProps={{ disableUnderline: true }}
                    />
                    <IconButton onClick={() => handleDeleteContent(index)}>
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </Box>
              </div>
            )}
            {'image' in item && (
              <div>
                <Box display="block" alignItems="center" justifyContent="space-between" mb={2}>
                  <Typography>Image:</Typography>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    { item.image && (item.image).slice(0, 8) === "https://" ? (
                      <img src={item.image} alt="Thumbnail" width={'40%'} />
                    ) : (
                      <input type="file" accept="image/*" required onChange={(e) => handleContentChange('image',e.target.files[0], index)} />
                    )}
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
      { blogContent &&  <Box my={2}>
        <Button variant="contained" size="small" onClick={() => handleContentChange('heading', '', blogContent.length)} startIcon={<Title />} sx={{ mr: 1 }}>
          Add Heading
        </Button>
        <Button variant="contained" size="small" onClick={() => handleContentChange('subheading', '', blogContent.length)} startIcon={<Subtitles />} sx={{ mr: 1 }}>
          Add Sub Heading
        </Button>
        <Button variant="contained" size="small" onClick={() => handleContentChange('paragraph', '', blogContent.length)} startIcon={<Subtitles />} sx={{ mr: 1 }}>
          Add Paragraph
        </Button>
        <Button variant="contained" size="small" onClick={() => handleContentChange('quote', '', blogContent.length)} startIcon={<FormatQuote />} sx={{ mr: 1 }}>
          Add Quote
        </Button>
        <Button variant="contained" size="small" onClick={() => handleContentChange('note', '', blogContent.length)} startIcon={<FormatQuote />} sx={{ mr: 1 }}>
          Add Note
        </Button>
        <Button variant="contained" size="small" onClick={() => handleContentChange('image',null, blogContent.length)} startIcon={<Image />} sx={{ mr: 1 }}>
          Add Image
        </Button>
      </Box>

      }
       
      <Box my={2}>
        <Button variant="contained" onClick={handleSaveBlog}>
          {id === 'b1' ? 'Save Blog' : 'Update Blog'}
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
