import React, { useState, useRef, useEffect } from 'react'
import './login.scss'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FormControl, TextField, Button } from '@mui/material'
import { ReactSession } from 'react-client-session'
import useLogin from '../../hooks/useLogin'
import useAuth from '../../hooks/useAuth'

const Login = () => {
  //new from
  const { auth, setAuth } = useAuth()

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || '/'

  const userRef = useRef()
  const errRef = useRef()
  const [success, setSuccess] = useState(false)
  const [errMsg, setErrMsg] = useState('')

  //new till

  ReactSession.setStoreType('localStorage')
  const [isLogged, setIsLogged] = React.useState(
    ReactSession.get('isLogged') || false
  )
  const loginUrl = `${process.env.REACT_APP_API_URL}auth/login`
  const [data, login, error, loading] = useLogin(loginUrl)

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  })

  //

  useEffect(() => {
    //userRef.current.focus()
  }, [])

  useEffect(() => {
    setErrMsg('')
  }, [loginData])

  //

  const handleInput = (e) => {
    const { name, value } = e.target
    setLoginData((prev) => ({ ...prev, [name]: value }))
  }

  useEffect(() => {
    if (!data) {
      console.log('Data not found')
      return
    }
    if (data.status === 200) {
      setAuth(data.data)
      ReactSession.set('isLogged', true)
      setIsLogged(ReactSession.get('isLogged'))
      navigate(from, { replace: true })
    } else {
      console.log('Something went wrong')
    }
  }, [data])

  useEffect(() => {
    setErrMsg(error)
    //errRef.current.focus()
  }, [error])

  const handleLogin = () => {
    login(loginData)

    /*try {
      login(loginData)
      if (!data) {
        console.log('Data not found')
        return
      }
      if (data.status === 200) {
        setAuth(data)
        ReactSession.set('isLogged', true)
        setIsLogged(ReactSession.get('isLogged'))
        setSuccess(true)
      } else {
        console.log('Something went wrong')
      }
    } catch (err) {
      console.log('error')
      if (!err?.response) {
        setErrMsg('No Server Response')
      } else if (err.response?.status === 400) {
        setErrMsg('Missing username or password')
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized')
      } else {
        setErrMsg('Login Failed')
      }
      
    }*/
  }

  return (
    <div className='login'>
      <div className='container'>
        <div className='top'>
          <h1 className='title'>Login</h1>
          <span>Login into your to continue</span>
        </div>
        <div className='bottom'>
          <FormControl className='form'>
            <TextField
              fullWidth
              id='email fullWidth'
              className='formInput'
              label='Email'
              variant='outlined'
              onChange={handleInput}
              value={loginData.email}
              name='email'
              ref={userRef}
            />

            <TextField
              fullWidth
              id='fullWidth password'
              className='formInput'
              label='Password'
              variant='outlined'
              onChange={handleInput}
              value={loginData.password}
              type='password'
              name='password'
            />
            <Button
              onClick={handleLogin}
              className='loginBtn'
              variant='contained'
            >
              Login
            </Button>
          </FormControl>

          <p className='error-msg' ref={errRef} aria-live='assertive'>
            {errMsg}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
