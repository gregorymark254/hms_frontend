import { useState, useEffect } from 'react';
import axios from '../../api/api';
import swal from 'sweetalert';

export default function AuthToken () {
  function getToken () {
    const tokenString = window.localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);

    // Check if the token exists and is not expired
    if (userToken && userToken.expiresAt > new Date().getTime()) {
      axios.defaults.headers.common.Authorization = `Bearer ${userToken.data.access_token}`;
      axios.defaults.headers.common['Content-Type'] = 'application/json';
      return userToken?.data.access_token;
    } else {
      // Remove the token if it is expired or not present
      window.localStorage.removeItem('token');
      return null;
    }
  }

  const [accessToken, setAccessToken] = useState(getToken());

  const saveToken = (userToken, expirationHours = 1) => {
    const expiresAt = new Date().getTime() + expirationHours * 1000;
    const tokenData = { data: userToken.data, expiresAt };

    window.localStorage.setItem('token', JSON.stringify(tokenData));
    setAccessToken(userToken);
  };

  useEffect(() => {
    // Check and remove expired token on component mount
    getToken();

    // Set up an interval to check token expiration every minute
    const checkTokenInterval = setInterval(() => {
      const token = getToken();
      if (!token) {
        clearInterval(checkTokenInterval); // Stop checking once token is expired
        swal('Session has expired!', 'Please log in again.', 'info');
        window.location.href = '/';
        window.location.reload();
      }
    }, 1 * 1000); // Check every 1 hour

    return () => clearInterval(checkTokenInterval);
  }, []);

  return {
    setAccessToken: saveToken,
    accessToken
  };
}
