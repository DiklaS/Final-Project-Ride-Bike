import { useEffect, useState } from 'react';
import { authActions } from "../store/auth";
import { useDispatch } from 'react-redux';

const AutoLogoutPage = ({ logoutTimeInMs }) => {
  const [timeoutId, setTimeoutId] = useState(null);
  const dispatch = useDispatch(); 

  useEffect(() => {
    //console.log('AutoLogout component mounted');

    const timerId = setTimeout(logoutUser, logoutTimeInMs);
    setTimeoutId(timerId);

    const resetTimerOnActivity = () => {
      //console.log('User activity detected. Resetting the timer.');
      clearTimeout(timeoutId);
      const newTimerId = setTimeout(logoutUser, logoutTimeInMs);
      setTimeoutId(newTimerId);
    };

    window.addEventListener('mousemove', resetTimerOnActivity);
    window.addEventListener('keydown', resetTimerOnActivity);
    window.addEventListener('click', resetTimerOnActivity);

    return () => {
      //console.log('AutoLogout component unmounted');
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', resetTimerOnActivity);
      window.removeEventListener('keydown', resetTimerOnActivity);
      window.removeEventListener('click', resetTimerOnActivity);
    };
  }, []);

  const logoutUser = () => {
    //console.log('Logging out user...');
    localStorage.clear();
    dispatch(authActions.logout());
  };

  return null; 
};

export default AutoLogoutPage;

