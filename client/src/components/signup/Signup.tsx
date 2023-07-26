// import React from 'react';

// export default function Signup(){
//   return (
//     <div className="min-h-screen bg-gray-100 flex justify-center items-center">
//     <div className="pageWrapper">
//     <div className="main">
//     <div className="Rectangle22" >  <div className="CreateAccount" style={{textAlign: 'right', color: 'white', fontSize: 24, fontFamily: 'Patua One', fontWeight: '400', textTransform: 'uppercase', wordWrap: 'break-word'}}>create Account</div></div>
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
//         <div className="mb-6" style={{    marginInline: '1rem',
//     marginTop:'6rem'}}>

//         <div className="Frame6" style={{width: '100%', height: '100%', padding: 10, background: '#5064CF', borderRadius: 9, border: '0.50px #504B4B solid', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
//     <div className="SignUp" style={{textAlign: 'right', color: '#FFFEFE', fontSize: 16, fontFamily: 'Abyssinica SIL', fontWeight: '400', textTransform: 'uppercase', wordWrap: 'break-word'}}>sign up</div>
// </div></div>
//       </form>
//       </div>
//     </div>
//   </div>

  



//     </div>
//   );
// };

import { useContext, useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { Helmet } from 'react-helmet-async'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useSignupMutation } from '../../hooks/userHooks'
import { Store } from '../../store/Store'
import { ApiError } from '../../types/ApiError'
import { getError } from '../../utils'

export default function SignupPage() {
  const navigate = useNavigate()
  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/'

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const { state, dispatch } = useContext(Store)
  const { userInfo } = state

  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  const { mutateAsync: signup, isLoading } = useSignupMutation()

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    try {
      const data = await signup({
        name,
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

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control onChange={(e) => setName(e.target.value)} required />
        </Form.Group>

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

        <Form.Group className="mb-3" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </Form.Group>

        <div className="mb-3">
          <Button type="submit">Sign Up</Button>
        </div>

        <div className="mb-3">
          Already have an account?{' '}
          <Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
        </div>
      </Form>
    </Container>
  )
}
