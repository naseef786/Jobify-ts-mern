// import React from 'react';
// import './login.css'
// export default function Login(){
//   return (
//     <div className="pageWrapper">
//     <div className="main">
//     <div className="Rectangle22" >  <div className="CreateAccount" style={{textAlign: 'center', color: 'white', fontSize: 24, fontFamily: 'Patua One', fontWeight: '400', textTransform: 'uppercase', wordWrap: 'break-word'}}>Log in to your Account</div></div>
//     <div  style={{    marginTop: '-18rem'}}>
//       <form className='form'>
//         <div className="mb-4">
//           <label htmlFor="email" className="block font-medium mb-1">
//             Email
//           </label>
//           <input
//             type="email"
//             id="email"
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//           />
//         </div>
//         <div className="mb-6">
//           <label htmlFor="password" className="block font-medium mb-1">
//             Password
//           </label>
          
//           <input
//             type="password"
//             id="password"
//             className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
//           />
//         </div>
//         <button
//         className="mb-6" color='blue'  style={{ borderRadius:'4px' ,   marginInline: '1rem',
//     marginTop:'6rem'}}>

//         <div className="Frame6" style={{width: '100%', height: '100%', padding: 10, background: '#5064CF', borderRadius: 9, border: '0.50px #504B4B solid', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
//     <div className="SignUp" style={{textAlign: 'right', color: '#FFFEFE', fontSize: 16, fontFamily: 'Abyssinica SIL', fontWeight: '400', textTransform: 'uppercase', wordWrap: 'break-word'}}>sign up</div>
// </div></button>
//       </form>
//       </div>
//     </div>
//   </div>

//   );
// };


import { useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import LoadingBox from '../loadingBox/LoadingBox'
import { useSigninMutation } from '../../hooks/userHooks'
import { Store } from '../../store/Store'
import { ApiError } from '../../types/ApiError'
import { getError } from '../../utils'

export default function SigninPage() {
  const navigate = useNavigate()
  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { state, dispatch } = useContext(Store)
  const { userInfo } = state

  const { mutateAsync: signin, isLoading } = useSigninMutation()

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const data = await signin({
        email,
        password,
      })
      dispatch({ type: 'USER_SIGNIN', payload: data })
      localStorage.setItem('userInfo', JSON.stringify(data))
      navigate(redirect)
    } catch (err) {
      toast.error(getError(err as ApiError))
    }
  }

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  return (
    <Container className="small-container" style={{width:'500px' ,marginTop: '150px',borderRadius:'6px', backgroundColor: '#020A35'}}>
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="mb-3">
          <Button disabled={isLoading} type="submit">
            Sign In
          </Button>
          {isLoading && <LoadingBox />}
        </div>
        <div className="mb-3">
          New customer?{' '}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  )
}