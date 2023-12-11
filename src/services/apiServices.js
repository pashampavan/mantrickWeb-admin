import apiClient from "./apiClient";

class ApiServices {

  fetchAllBlogs = async () => {
    try {
      const response = await apiClient.get(`/blogs.json`);
      return response;
    } catch (err) {
      console.error(`Error: ${err}`);
      return err.response;
    }
  };

  fetchAllEvents = async () => {
    try {
      const response = await apiClient.get(`/events.json`);
      return response;
    } catch (err) {
      console.error(`Error: ${err}`);
      return err.response;
    }
  };
  fetchAllLandings = async () => {
    try {
      const response = await apiClient.get(`/landingpage.json`);
      return response;
    } catch (err) {
      console.error(`Error: ${err}`);
      return err.response;
    }
  };

  fetchBlog = async (id) => {
    try {
      const response = await apiClient.get(`/blogs/${id}.json`);
      return response;
    } catch (err) {
      console.error(`Error: ${err}`);
      return err.response;
    }
  };

  fetchEvent = async (id) => {
    try {
      const response = await apiClient.get(`/events/${id}.json`);
      return response;
    } catch (err) {
      console.error(`Error: ${err}`);
      return err.response;
    }
  };
  fetchLanding = async (id) => {
    try {
      const response = await apiClient.get(`/landingpage/${id}.json`);
      return response;
    } catch (err) {
      console.error(`Error: ${err}`);
      return err.response;
    }
  };

  saveBlog = async (newBlog) => {
    try {
        const response = await apiClient.post(`/blogs.json`, newBlog);
        return response;
      } catch (err) {
        console.error(`Error: ${err}`);
        return err.response;
    }
  }

  updateBlog = async (id, newBlog) => {
    try {
        const response = await apiClient.put(`/blogs/${id}.json`, newBlog);
        return response;
      } catch (err) {
        console.error(`Error: ${err}`);
        return err.response;
    }
  }

  saveEvent = async (newEvent) => {
    try {
        const response = await apiClient.post(`/events.json`, JSON.stringify(newEvent));
        return response;
      } catch (err) {
        console.error(`Error: ${err}`);
        return err.response;
    }
  }
  saveLanding = async (newEvent) => {
    try {
        const response = await apiClient.post(`/landingpage.json`, JSON.stringify(newEvent));
        return response;
      } catch (err) {
        console.error(`Error: ${err}`);
        return err.response;
    }
  }

  updateEvent = async (id, newEvent) => {
    try {
        const response = await apiClient.put(`/landingpage/${id}.json`, newEvent);
        return response;
      } catch (err) {
        console.error(`Error: ${err}`);
        return err.response;
    }
  }
  updateLanding = async (id, newEvent) => {
    try {
        const response = await apiClient.put(`/landingpage/${id}.json`, newEvent);
        return response;
      } catch (err) {
        console.error(`Error: ${err}`);
        return err.response;
    }
  }

}

export default new ApiServices();
