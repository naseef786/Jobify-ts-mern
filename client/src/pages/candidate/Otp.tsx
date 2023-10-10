import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Store } from "../../store/Store";
import LoadingBox from "../../components/loadingBox/LoadingBox";
import { useRecoveryMutation } from '../../hooks/userHooks';
import { useVerifyMutation } from '../../hooks/userHooks';
import { toast } from 'react-toastify'
import { getError } from '../../utils';
import { ApiError } from '../../types/ApiError';
export default function Otp  () {

  const [OTP, setOTP] = useState('');
  const navigate = useNavigate()
  const { search } = useLocation()
  const redirectInUrl = new URLSearchParams(search).get('redirect')
  const redirect = redirectInUrl ? redirectInUrl : '/';
  const location = useLocation()
  
  const { state, dispatch } = useContext(Store)
  const { userInfo } = state
  const email = location.state;
  useEffect(() => {
    if (userInfo) {
      navigate(redirect)
    }
  }, [navigate, redirect, userInfo])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOTP(e.target.value); // This line may cause the error
  };
  const { mutateAsync: verify} = useVerifyMutation()


  async function onSubmit(e:React.SyntheticEvent){
    e.preventDefault();
    try {
      let data = await verify({ email :email, code : OTP })
       console.log(data.status);
       
      if(data){
        toast.success('Verify Successfully!')
        return navigate('/reset',{state:email})
      }  

    } catch (error) {
      return toast.error('Wront OTP! Check email again!')
    }
  }


  const { mutateAsync: recover, isLoading } = useRecoveryMutation()
  const resendOTP =  async(e:React.SyntheticEvent)=>{

    e.preventDefault()
    try {
      const data = await recover({
        email
      })
     toast.success('new otp forwarded successfully')
    } catch (err) {
      toast.error(getError(err as ApiError))
    }
      // disp


  }

  return (
<div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-12">
  <div className="relative bg-white px-6 pt-10 pb-9 shadow-xl mx-auto w-full max-w-lg rounded-2xl">
    <div className="mx-auto flex w-full max-w-md flex-col space-y-16">
      <div className="flex flex-col items-center justify-center text-center space-y-2">
        <div className="font-semibold text-3xl">
          <p>Email Verification</p>
        </div>
        <div className="flex flex-row text-sm font-medium text-gray-400">
          <p>We have sent a code to your email </p>
        </div>
        <form className='pt-20'  onSubmit={onSubmit}> 
          <div className="flex flex-col space-y-16">
            <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
          
            <div className="flex flex-col space-y-5">
            <div className="input text-center">
                    <span className='py-4 text-sm text-left text-gray-500'>
                      Enter 6 digit OTP sent to your email address.
                    </span>
                    <input onChange={ handleChange }   value={OTP} maxLength={6}  type="text" placeholder='OTP' />
                  </div>
              <div>
                <button type='submit' className="flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-5 bg-blue-700 border-none text-white text-sm shadow-sm">
                  Verify Account
                </button>
              </div>
              <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                <p>Didn't recieve code?</p> <a className="flex flex-row items-center text-blue-600" onClick={resendOTP} target="_blank" rel="noopener noreferrer">Resend</a>
              </div>
              {isLoading && <LoadingBox />}

            </div>
          </div>
          </div>
        </form>
      </div>
      <div>
     
      </div>
    </div>
  </div>
</div>

  )
}

