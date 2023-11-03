import { useMutation, useQuery } from '@tanstack/react-query'
import apiClient from '../axios/apiClient'
import { HirerInfo } from '../types/UserInfo'
import { Job, Jobs } from '../types/Jobs'
import { Candidate } from '../types/Candidate'

export const useRecruiterSignupMutation = () =>
  useMutation({
    mutationFn: async ({
    
      email,
      password,
      name,
      company,
      phone,
      image,
      website,
      tagline,
      location,
      description
    }: {
    name:string
      email: string
      password: string
      company:string
      phone:string
      image:string
      website:string
      tagline:string
      location:string
      description:string
    }) =>
      (
        await apiClient.post<HirerInfo>(`api/recruiter/signup`, {
          name,
          email,
          password,
          company,
          phone,
          image,
          website,
          tagline,
          location,
          description
        })
      ).data,
  })


  export const useRecruiterSigninMutation = () =>
useMutation({
  mutationFn: async ({
    email,
    password,
    
  }: {
    email: string
    password: string
  
  }) =>
    (
      await apiClient.post<HirerInfo>(`api/recruiter/signin`, {
        email,
        password,
      })
    ).data,
})



export const usePostJobMutation = () =>
  useMutation({
    mutationFn: async ({
    
      jobTitle,
      salary,
      vacancies,
      experience,
      location,
      resposibilities,
      vaccancy,
      qualification ,
      company ,
      description,
      requirements,
      shifts ,
      benefits  ,
      countOfStaffNeeded,
      createdAt,
      jobType,
      token
     
    }: {

      jobTitle: string;
      salary: number;
      vacancies: number;
      experience: number;
      location: string;
      resposibilities?: string;
      vaccancy:string
      qualification : string
      company : String
      description : string
      requirements:string
      shifts : String
      benefits  :String
      countOfStaffNeeded: string
      createdAt:string;
      jobType:string;
      token:string

    }) =>
      (
        await apiClient.post(`api/recruiter/post-job`, {
      jobTitle,
      salary,
      vacancies,
      experience,
      location,
      vaccancy,
      qualification ,
      company ,
      description,
      requirements,
      shifts ,
      benefits,
      jobType,
        },{      headers: {
          Authorization: `Bearer ${token}`
        }})
      ).data,
  })


  export const useGetCandidatesQuery = (token:string) => {
    return useQuery(['candidates'], async () => {
    
   
    
      if (!token) {
        throw new Error('Token not found in local storage'); // Handle case where token is not available
      }
  
      const response = await apiClient.get<Candidate[]>(`/api/recruiter/candidates`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      return response.data;
    });
  };