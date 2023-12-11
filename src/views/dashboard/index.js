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
                Content
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
                Events
              </Typography>
            </CardContent>
            <CardActions>
              <Button component={Link} to="/events" size="small" color="primary">
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
