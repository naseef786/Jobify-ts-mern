import { useMutation, useQuery } from '@tanstack/react-query'
import apiClient from '../axios/apiClient'
import { AdminInfo, HirerInfo } from '../types/UserInfo'
import { Recruiter } from '../types/Recruiter'
import {Candidate}  from '../types/Candidate'
 


export const useAdminSigninMutation = () =>
useMutation({
  mutationFn: async ({
    email,
    password,
    
  }: {
    email: string
    password: string
  
  }) =>
    (
      await apiClient.post<AdminInfo>(`api/admin/signin`, {
        email,
        password,
      })
    ).data,
})

export const useAdminSignupMutation = () =>
  useMutation({
    mutationFn: async ({
    
      email,
      password,
      name
    }: {
    name:string
      email: string
      password: string

    }) =>
      (
        await apiClient.post<AdminInfo>(`api/admin/signup`, {
          name,
          email,
          password,
        })
      ).data,
  })
  export const useGetRecruitersQuery = (token:string) => {
    return useQuery(['recruiters'], async () => {
    
   
    
      if (!token) {
        throw new Error('Token not found in local storage'); // Handle case where token is not available
      }
  
      const response = await apiClient.get<Recruiter[]>(`/api/admin/recruiters`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      return response.data;
    });
  };
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

  export const useGetCompQuery = (token:string ,params:any) => {
    return useQuery(['recruiters'], async () => {
    
   
    
      if (!token) {
        throw new Error('Token not found in local storage'); // Handle case where token is not available
      }
  
      const response = await apiClient.get(`/api/admin/companies`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params:params
      });
  
      return response.data;
    });
  };


  export const usegetCompMutation = () =>
  useMutation({
    mutationFn: async ({
      token,
      newUrl
   
    }:{token:string,newUrl:any}) =>
      (
        await apiClient.get(`/api/admin/companies`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params:newUrl
        })
      ).data,
  })

  export const useDeleteJobMutation = () =>
  useMutation({
    mutationFn: async ({
      token,
      jobId
   
    }:{token:string,jobId:string}) =>
      (
        await apiClient.delete(`/api/recruiter/jobs`, {
          headers: {
            Authorization: `Bearer ${token}`
          },
          params:{jobId}
        })
      ).data,
  })