import React from 'react';
import { Card, CardContent, CardActions, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import DescriptionIcon from '@mui/icons-material/Description';

const Dashboard = () => {
  return (
    <div style={{ padding: '20px' }}>
      <Grid container spacing={3}>
        {/* Content Card */}
        <Grid item xs={12} sm={2} md={2}>
          <Card>
            <CardContent>
              <DescriptionIcon fontSize="large" />
              <Typography variant="h5" component="div">
                Training Videos
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/content" size="small" color="primary">
                Open
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Events Card */}
        <Grid item xs={12} sm={2} md={2}>
          <Card>
            <CardContent>
              <EventIcon fontSize="large" />
              <Typography variant="h5" component="div">
              Photos
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/events" size="small" color="primary">
                Open
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          <Card>
            <CardContent>
              <EventIcon fontSize="large" />
              <Typography variant="h5" component="div">
                Landingpage
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/landingpage" size="small" color="primary">
                Open
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          <Card>
            <CardContent>
              <EventIcon fontSize="large" />
              <Typography variant="h5" component="div">
                Blogs
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/blogs" size="small" color="primary">
                Open
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          <Card>
            <CardContent>
              <EventIcon fontSize="large" />
              <Typography variant="h5" component="div">
                Gallary
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/gallary" size="small" color="primary">
                Open
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          <Card>
            <CardContent>
              <EventIcon fontSize="large" />
              <Typography variant="h5" component="div">
                Studentcorner
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/studentcorner" size="small" color="primary">
                Open
              </Button>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={12} sm={2} md={2}>
          <Card>
            <CardContent>
              <EventIcon fontSize="large" />
              <Typography variant="h5" component="div">
                Testimonials
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/testimonials" size="small" color="primary">
                Open
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
