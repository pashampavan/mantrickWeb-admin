import { Button, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EventThumbnail from './EventThumbnail.js';
import apiServices from '../../services/apiServices.js';
import './../Style/events.css';
const AllLandings = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const fetchLandings = async () => {
        try {
          const response = await apiServices.fetchAllTestimonials();
          // const response = await axios.get('https://swayam-website-d9b3d-default-rtdb.asia-southeast1.firebasedatabase.app/events.json');
          if(response.data!=null)
          setEvents(response.data);
          console.log(events);
        } catch (error) {
        console.error('Error fetching Events:', error);
        }
    };

    useEffect(() => {
        fetchLandings();
    }, []);

  const eventIds = Object.keys(events);

  return (
    <>
      <div className="eventsBlock" style={{ width: "80%", margin: '50px auto' }}>
        <div style={{ width: "100%", display: 'flex', justifyContent: 'space-between' }}>
          <h1 id='title'>All Testimonials</h1>
          <Button
            variant="contained"
            size="small"
            onClick={() => { navigate(`/testimonials/add-edit-landing/${'b1'}`) }}
            style={{fontSize:"30px"}}
          >+</Button>
        </div>
        <div id='events' >
          {eventIds.map((eventId) => {
            const event = events[eventId];
            return (
              <div key={eventId} className="thumb">
                <EventThumbnail
                  title={event.title}
                  // url={event.eventurl}
                  imageOne={event.imageUrl}
                  // imageTwo={event.eventimagetwo}
                  // date={event.eventdate}
                  id={eventId}
                  eventDescription={event.description}
                   />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AllLandings;
