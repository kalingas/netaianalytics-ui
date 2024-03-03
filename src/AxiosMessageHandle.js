import axios from 'axios';

// function sendMessage(message) {
//   return axios.post('/chat/message', { message });
//   // axios.post('/chat/message', { message })
//   //   .then(response => {
//   //     // Handle the response from the server
//   //     console.log(response.data);
//   //   })
//   //   .catch(error => {
//   //     // Handle any errors
//   //     console.error('There was an error!', error);
//   //   });
// }

function sendMessage(message) {
  return axios.post('/chat/message', { message })
    .then(response => {
      // Handle the response from the server
      return response.data; // Return the data to the calling function
    })
    .catch(error => {
      // Handle any errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
      console.error('Error config:', error.config);

      // Optionally, you can reject the promise with a custom error message or object
      return Promise.reject(error.response || error.request || error.message);
    });
}

function uploadFile(file) {
    const formData = new FormData();
    formData.append('data_file', file);
  
    axios.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      // Handle the response from the server
      console.log(response.data);
    })
    .catch(error => {
      // Handle any errors
      console.error('There was an error!', error);
    });
  }

  export { sendMessage };
  export { uploadFile };
  