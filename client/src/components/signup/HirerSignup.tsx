import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { TEInput, TERipple } from "tw-elements-react";
import { useRecruiterSignupMutation } from "../../hooks/hirerHooks.ts";
import { getError } from "../../utils";
import { ApiError } from "../../types/ApiError";
import { Store } from "../../store/Store";
import { toast } from 'react-toastify'
import { Helmet } from "react-helmet-async";
import profile from '../../assets/profile.png'
import LoadingBox from "../loadingBox/LoadingBox";




export default function HirerSignUp(): JSX.Element {

    const navigate = useNavigate()
    const { search } = useLocation()
    const redirectInUrl = new URLSearchParams(search).get('redirect')
    const redirect = redirectInUrl ? redirectInUrl : '/hirer'


    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [company, setCompanyName] = useState('')
    const [website, setWebsite] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [image, setImage] = useState<string>('');

    const [tagline,setTagline] = useState('')
    const[description,setDescription] = useState('')
    const [location,setLocation] = useState('')

    const { state, dispatch } = useContext(Store)
    const { hirerInfo } = state

    const { mutateAsync: signup, isLoading } = useRecruiterSignupMutation()

    function handleImageUpload(e:React.ChangeEvent<HTMLInputElement>) {
        const selectedImage = e.target.files && e.target.files[0]; // Get the selected image file
    
        if (selectedImage) {
            const allowedFormats = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        
            if (!allowedFormats.exec(selectedImage.name)) {
              toast.error('Invalid file type!');
            } else {
              // Read the selected image and convert it to a data URL
              const reader = new FileReader();
        
              reader.onload = (event) => {
                if (event.target && typeof event.target.result === 'string') {
                  setImage(event.target.result);
                }
              };
        
              reader.readAsDataURL(selectedImage);
        
              toast.success('Image selected successfully.');
            }
          }
          
          
      }
      

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
                company,
                phone,
                image,
                website,
                tagline,
                location,
                description,
            })
            console.log(data);
            
            dispatch({ type: 'HIRER_SIGNIN', payload: data })
            localStorage.setItem('hirerInfo', JSON.stringify(data.token))
            navigate(redirect)
        } catch (err) {
            toast.error(getError(err as ApiError))
        }
    }
    useEffect(() => {
        if (hirerInfo) {
            navigate(redirect)
        }
    }, [navigate, redirect, hirerInfo])

    return (
        <section className="h-full bg-neutral-200 dark:bg-neutral-700">
            <Helmet>
                <title>Recruiter Sign Up</title>
            </Helmet>
            <div className="container h-full p-10">
                <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
                    <div className="w-full">
                        <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
                            <div className="g-0 lg:flex lg:flex-wrap">
                                {/* <!-- Left column container--> */}
                                <div className="px-4 md:px-0 lg:w-6/12">
                                    <div className="md:mx-6 md:p-12">
                                        {/* <!--Logo--> */}
                                        <div className="text-center">
                                            <img
                                                className="mx-auto w-48"
                                                src={image?image:  profile}
                                                alt="logo"
                                            />
                                            <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                                                Welcome to jobify....
                                            </h4>
                                        </div>

                                        <form onSubmit={submitHandler}>
                                            <p className="mb-4">Please sign up for a account</p>
                                            {/* <!--Username input--> */}
                                            <TEInput
                                                type="email"
                                                label={
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                                }
                                                className="mb-4"
                                                required
                                                onChange={(e) => setEmail(e.target.value)}
                                            ></TEInput>
                                            <TEInput
                                                type="Number"
                                                label={
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">phone</label>
                                                }
                                                className="mb-4"
                                                required
                                                onChange={(e) => setPhone(e.target.value)}
                                            ></TEInput>
                                            <TEInput
                                                type="text"
                                                label={
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Website Link</label>
                                                }
                                                className="mb-4"
                                                required
                                                onChange={(e) => setWebsite(e.target.value)}
                                            ></TEInput>
                                            <TEInput
                                                type="text"
                                                label={
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Company</label>
                                                }
                                                className="mb-4"
                                                required
                                                onChange={(e) => setCompanyName(e.target.value)}
                                            ></TEInput>
                                            <TEInput
                                                type="text"
                                                label={
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                                }
                                                className="mb-4"
                                                required
                                                onChange={(e) => setDescription(e.target.value)}
                                            ></TEInput>
                                             <TEInput
                                                type="text"
                                                label={
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Tag line</label>
                                                }
                                                className="mb-4"
                                                required
                                                onChange={(e) => setTagline(e.target.value)}
                                            ></TEInput>
                                             <TEInput
                                                type="text"
                                                label={
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                                }
                                                className="mb-4"
                                                required
                                                onChange={(e) => setLocation(e.target.value)}
                                            ></TEInput>
                                            <TEInput
                                                type="text"
                                                label={
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">user name</label>
                                                }
                                                className="mb-4"
                                                required
                                                onChange={(e) => setName(e.target.value)}
                                            ></TEInput>
                                            <TEInput
                                                type="file" // Set the input type to "file" for image uploading
                                                label={
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                                                }
                                                className="mb-4"
                                                accept="image/*" // Limit file selection to image files
                                                required
                                                onChange={(e) => handleImageUpload(e)} // Define a function to handle image uploads
                                            ></TEInput>





                                            {/* <!--Password input--> */}
                                            <TEInput
                                                type="password"
                                                label={
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                                }
                                                required
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="mb-4"
                                            ></TEInput>

                                            <TEInput
                                                type="password"
                                                label={
                                                    <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                                }
                                                required
                                                onChange={(e) => setConfirmPassword(e.target.value)}
                                                className="mb-4"
                                            ></TEInput>

                                            {/* <!--Submit button--> */}
                                            <div className="mb-12 pb-1 pt-1 text-center">
                                                <TERipple rippleColor="light" className="w-full">
                                                    <button
                                                        className="mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                                                        type="submit"
                                                        style={{
                                                            background:
                                                                "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                                                        }}
                                                    >
                                                        Sign Up
                                                    </button>

                                                </TERipple>
                                                {isLoading && <LoadingBox />}



                                            </div>

                                            {/* <!--Register button--> */}
                                            <div className="flex items-center justify-between pb-6">
                                                <p className="mb-0 mr-2">already have an account?</p>
                                                <TERipple rippleColor="light">



                                                    <button
                                                        type="button"
                                                        className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"

                                                    >
                                                        <Link to={`/hirer/signin`}>Log In to your account</Link>
                                                        Log In
                                                    </button>
                                                </TERipple>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                {/* <!-- Right column container with background and description--> */}
                                <div
                                    className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                                    style={{
                                        background: "linear-gradient(to right, #020a35, #D3C0C0, #C0ABB9, #A3C4BC)"
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
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}