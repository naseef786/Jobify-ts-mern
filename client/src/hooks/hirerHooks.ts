import { useMutation } from '@tanstack/react-query'
import apiClient from '../axios/apiClient'
import { HirerInfo } from '../types/UserInfo'

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