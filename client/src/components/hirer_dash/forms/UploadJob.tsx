
import { useState, FC, FormEvent, useContext } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import TextInput from "../../user_dash/TextInput";
import JobCard from "../../user_dash/JobCard";
import CustomButton from "../../button/CustomButton";
import LoadingBox from "../../loadingBox/LoadingBox";
import { ToastContainer, toast } from 'react-toastify';
import { getError, jobs } from "../../../utils";
import JobTypes from "./JobTypes";
import { Store } from "../../../store/Store";
import { usePostJobMutation } from "../../../hooks/hirerHooks";
import { ApiError } from "../../../types/ApiError";



interface FormInput {
  jobTitle: string;
  salary: number;
  vacancies: number;
  experience: number;
  location: string;
  resposibilities?: string;
  vaccancy: string
  qualification: string
  company: String
  description: string
  requirements: string
  shifts: String
  benefits: String
  countOfStaffNeeded: string
  createdAt: string;
  jobType: string;

}

const UploadJob: React.FC = () => {

  const { state, dispatch } = useContext(Store)
  const { jobs, hirerInfo } = state
  const token = hirerInfo.token
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    mode: "onChange",
    defaultValues: {},
  });

  const [errMsg, setErrMsg] = useState<string>("");

  const [jobType, setJobType] = useState<string>("Full-Time");
  const [recentPost, setRecent] = useState([])
  const { mutateAsync: Postjob, isLoading } = usePostJobMutation()
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    const newData = { ...data,jobType, token: token }
    console.log(newData);
    try{
    const res = await Postjob(newData)
    if(res){
      console.log(res);
      toast.success(res.message)
    }

    }catch (err) {
      toast.error(getError(err as ApiError))
  }
  };

  return (
    <div className="main-container">
      <div className='container mx-auto flex flex-col md:flex-row gap-8 2xl:gap-14 bg-[#f7fdfd] px-5'>
        <div className='w-full h-fit md:w-2/3 2xl:2/4 bg-white px-5 py-10 md:px-10 shadow-md'>
          <div>
            <p className='text-gray-500 font-semibold text-2xl'>Job Post</p>

            <form
              className='w-full mt-2 flex flex-col gap-8'
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* <TextInput
              name='jobTitle'
              label='Job Title'
              placeholder='eg. Software Engineer'
              type='text'
              required={true}
             register={register("jobTitle", {
                required: "Job Title is required",
              })}
              error={errors.jobTitle ? errors.jobTitle?.message : ""}
            /> */}


              <div className="flex flex-col mt-2">
                <p className="text-gray-600 text-sm mb-1">Job Title</p>
                <input
                  className="rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 "
                  type="text"
                  {...register("jobTitle", {
                    required: "job title  is required",
                  })}
                  aria-onInvalid={errors.jobTitle ? errors.jobTitle.message : 'mnj'}
                /></div>






              <div className='w-full flex gap-4'>
                <div className={`w-1/2 mt-2`}>
                  <label className='text-gray-600 text-sm mb-1'>Job Type</label>
                  <JobTypes jobType={jobType} setJobType={setJobType} />
                </div>

                <div className='w-1/2'>
                  <div className="flex flex-col mt-2">
                    <p className="text-gray-600 text-sm mb-1">Salary</p>
                    <input

                      className="rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 "
                      type='number'
                      {...register("salary", {
                        required: "Salary is required",
                      })}

                      aria-onInvalid={errors.salary ? errors.salary?.message : ''}
                    /></div>
                </div>
              </div>

              <div className='w-full flex gap-4'>
                <div className='w-1/2'>
                  {/* <TextInput
                    name='vacancies'
                    label='No. of Vacancies'
                    placeholder='vacancies'
                    type='number'
                    register={register("vacancies", {
                      required: "Vacancies is required!",
                    })}
                    error={errors.vacancies ? errors.vacancies?.message : ""}
                  /> */}
                  <div className="flex flex-col mt-2">
                    <p className="text-gray-600 text-sm mb-1">Vacancies</p>
                    <input
                      className="rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 "
                      type="number"
                      {...register("vacancies", {
                        required: "Compnay Name is required",
                      })}
                      aria-invalid={errors.vacancies ? true : false}
                    /></div>
                </div>

                <div className='w-1/2'>
                  {/* <TextInput
                    name='experience'
                    label='Years of Experience'
                    placeholder='experience'
                    type='number'
                    register={register("experience", {
                      required: "Experience is required",
                    })}
                    error={errors.experience ? errors.experience?.message : ""}
                  /> */}
                  <div className="flex flex-col mt-2">
                    <p className="text-gray-600 text-sm mb-1">Experience</p>
                    <input
                      className="rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 "
                      type="number"
                      {...register("experience", {
                        required: "Compnay Name is required",
                      })}
                      aria-invalid={errors.experience ? true : false}
                    /></div>
                </div>
              </div>
              {/* 
              <TextInput
                name='location'
                label='Job Location'
                placeholder='eg. New York'
                type='text'
                register={register("location", {
                  required: "Job Location is required",
                })}
                error={errors.location ? errors.location?.message : ""}
              /> */}
              <div className="flex flex-col mt-2">
                <p className="text-gray-600 text-sm mb-1">Location</p>
                <input
                  className="rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 "
                  type="text"
                  {...register("location", {
                    required: "Compnay Name is required",
                  })}
                  aria-invalid={errors.location ? true : false}
                /></div>
              <div className='flex flex-col'>
                <label className='text-gray-600 text-sm mb-1'>
                  Job Description
                </label>
                <textarea
                  className='rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none'
                  rows={4}
                  cols={6}
                  {...register("description", {
                    required: "Job Description is required!",
                  })}
                  aria-invalid={errors.description ? "true" : "false"}
                ></textarea>
                {errors.description && (
                  <span role='alert' className='text-xs text-red-500 mt-0.5'>
                    {errors.description?.message}
                  </span>
                )}
              </div>

              <div className='flex flex-col'>
                <label className='text-gray-600 text-sm mb-1'>
                  Core Responsibilities
                </label>
                <textarea
                  className='rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none'
                  rows={4}
                  cols={6}
                  {...register("resposibilities")}
                ></textarea>
              </div>
              <div className="flex flex-col mt-2">
                <p className="text-gray-600 text-sm mb-1">Shifts</p>
                <input
                  className="rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 "
                  type="text"
                  {...register("shifts", {
                    required: "Compnay Name is required",
                  })}
                  aria-invalid={errors.shifts ? true : false}
                /></div>

              <div className="flex flex-col mt-2">
                <p className="text-gray-600 text-sm mb-1">Qualification</p>
                <input
                  className="rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 "
                  type="text"
                  {...register("qualification", {
                    required: "Compnay Name is required",
                  })}
                  aria-invalid={errors.qualification ? true : false}
                /></div>
              <div className="flex flex-col mt-2">
                <p className="text-gray-600 text-sm mb-1">benefits</p>
                <input
                  className="rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 "
                  type="text"
                  {...register("benefits", {
                    required: "Compnay Name is required",
                  })}
                  aria-invalid={errors.benefits ? true : false}
                /></div>
              {/* <div className="flex flex-col mt-2">
                <p className="text-gray-600 text-sm mb-1">Name</p>
                <input
                  className="rounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 "
                  type="text"
                  {...register("name", {
                    required: "Compnay Name is required",
                  })}
                  aria-invalid={errors.name ? true : false}
                /></div> */}

              {errMsg && (
                <span role='alert' className='text-sm text-red-500 mt-0.5'>
                  {errMsg}
                </span>
              )}
              <div className='mt-2'>
                <CustomButton
                  type='submit'
                  containerStyles='inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none '
                  title='Sumbit'
                />
              </div>
            </form>
          </div>
        </div>
        {/* <div className='w-full md:w-1/3 2xl:2/4 p-5 mt-20 md:mt-0'>
        <p className='text-gray-500 font-semibold'>Recent Job Post</p>

        <div className='w-full flex flex-wrap gap-6'>
          {jobs?.slice(0, 4).map((job, index) => (
            <JobCard dispatch={dispatch} job={job} key={index} />
          ))}
        </div>
      </div> */}
      </div>
    </div>
  );
};

export default UploadJob;

