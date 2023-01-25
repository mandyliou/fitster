import { useToken, useAuthContext  } from './useToken'
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

function LogoutForm(props) {
  const [token_, login, logout] = useToken();
  const navigate = useNavigate();
  const { token } = useAuthContext();

  useEffect(() => {
    if (!token) {
        console.log('user not logged in, redirect to login page')
        navigate(`/login`)
    }
}, [navigate, token])

}

export default LogoutForm


