import  axios from 'axios';
export const  logMessage= async(service, level, message)=> {
    try {
      const response = await axios.post('http://localhost:3000/api/logs/monitoring', {
        service,
        level,
        message,
      });
      return response.data;
    } catch (error) {
      console.error('Error logging message:', error.message);
    }
  }
