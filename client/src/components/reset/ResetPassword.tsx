import React,{useContext,useState,useEffect} from "react";
import { useLocation, useNavigate,Link } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";
import { useResetPasswordMutation } from "../../hooks/userHooks";
import { getError } from "../../utils";
import { ApiError } from "../../types/ApiError";
import { Store } from "../../store/Store";
import { toast } from 'react-toastify'
import { Helmet } from "react-helmet-async";
import LoadingBox from "../loadingBox/LoadingBox";
import profile from "../../assets/profile.png"

export default function ResetPassword(): JSX.Element {

    const navigate = useNavigate()
    const { search } = useLocation()
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl ? redirectInUrl : '/login'
    const location = useLocation()
    const [pass, setPass] = useState('')
    const [confirmPass,setconfirmPass] = useState('')
  
    const { state, dispatch } = useContext(Store)
    const { userInfo } = state
    const email = location.state;
    const { mutateAsync: resetPassword, isLoading } = useResetPasswordMutation()
  console.log(pass);
  
    const submitHandler = async (e: React.SyntheticEvent) => {
      e.preventDefault()
      try {
        const data = await resetPassword({
          email,
          password:pass
        })
        console.log(data);
        
        if (data?.status == 201)
        {   
          toast.success('new password updated successfully')
          navigate('/')
        }
       else if (data?.status == 440){
        toast.error(data.data.message)
        navigate('/recovery')
       }
        // dispatch({ type: 'USER_SIGNIN', payload: data })
        // localStorage.setItem('userInfo', JSON.stringify(data))
        else{
          toast.error('something went wrong')
        }
        
       
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
    <section className="h-full bg-neutral-200 dark:bg-neutral-700">
         <Helmet>
        <title>update your password</title>
      </Helmet>
      <div className="container h-full p-10 flex justify-center items-center">
  <div className="g-6 flex flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
    <div className="w-full">
      <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
        <div className="g-0 lg:flex lg:flex-wrap">
                {/* <!-- Left column container--> */}
                <div className="px-4 md:px-0  ">
                  <div className="md:mx-6 md:p-12">
                    {/* <!--Logo--> */}
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src={profile}
                        alt="logo"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        reset password
                      </h4>
                    </div>

                    <form onSubmit={submitHandler}>
                      <p className="mb-4">Please enter your registered email address</p>
                      {/* <!--Username input--> */}
                      <TEInput
                        type="password"
                        label="New Password"
                        className="mb-4"
                        required
                        onChange={(e) => setPass(e.target.value)}
                      ></TEInput>
                       <TEInput
                        type="password"
                        label="Confirm Password"
                        className="mb-4"
                        required
                        onChange={(e) => setconfirmPass(e.target.value)}
                      ></TEInput>

                      {/* <!--Password input--> */}
                      {/* <TEInput
                        type="password"
                        label="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className="mb-4"
                      ></TEInput> */}

                      {/* <!--Submit button--> */}
                      <div className="mb-12 pb-1 pt-1 text-center">
                        <TERipple rippleColor="light" className="w-full">
                          <button
                            className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]
                             focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                            type="submit"
                            style={{
                              background:
                              "linear-gradient(to right, #CA942D, #CA942D00)",
                            }}
                          >
                            get otp
                          </button>
                        
                        </TERipple>
                        {isLoading && <LoadingBox />}

                        {/* <!--Forgot password link--> */}
                       
                      </div>

                      {/* <!--Register button--> */}
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Don't have an account?</p>
                        <TERipple rippleColor="light">

                        New customer?{' '}
          
                          <button
                            type="button"
                            className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600
                             hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700
                              active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                          
                          >
                            <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
                            Register
                          </button>
                        </TERipple>
                      </div>
                    </form>
                  </div>
                </div>

                {/* <!-- Right column container with background and description--> */}
                {/* <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                    
                      "linear-gradient(to right,#CA942D, #CA942D00)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      We are more than just a company
                    </h4>
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}