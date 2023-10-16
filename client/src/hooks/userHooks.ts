import { useMutation } from '@tanstack/react-query'
import apiClient from '../axios/apiClient'
import { UserInfo } from '../types/UserInfo'
import jwt_decode from 'jwt-decode';
import { ApiInfo } from '../types/ApiInfo';

export const useSigninMutation = () =>
  useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string
      password: string
    }) =>
      (
        await apiClient.post<UserInfo>(`api/users/signin`, {
          email,
          password,
        })
      ).data,
  })
export const useSignupMutation = () =>
  useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string
      email: string
      password: string
    }) =>
      (
        await apiClient.post<UserInfo>(`api/users/signup`, {
          name,
          email,
          password,
        })
      ).data,
  })
export const useUpdateProfileMutation = () =>
  useMutation({
    mutationFn: async ({
      name,
      email,
      password,
    }: {
      name: string
      email: string
      password: string
    }) =>
      (
        await apiClient.put<UserInfo>(`api/users/profile`, {
          name,
          email,
          password,
        })
      ).data,
  })
export const useRecoveryMutation = () =>
  useMutation({mutationFn: async ({email}:{ email: string}) =>
{const response = await apiClient.post<ApiInfo>(`api/users/recovery`, { email });
return {
  data: response.data,
  status: response.status, // Add this line to include the status code
}}})

export const useResetPasswordMutation = () =>
  useMutation({mutationFn: async ({email,password}:{ email: string,password:string}) =>
{const response = await apiClient.post<ApiInfo>(`api/users/resetPass`, { email,password });
return {
  data: response.data,
  status: response.status, // Add this line to include the status code
}}})

export const useVerifyMutation = () =>
  useMutation({mutationFn: async ({email,code}: { email: string,code:string}) =>
  (await apiClient.post<ApiInfo>(`api/users/verify`, {email,code})).data})


  export const useApplyJobMutation = () =>
  useMutation({mutationFn: async ({jobId,token}: { jobId: number,token:string}) =>
  (await apiClient.post<ApiInfo>(`api/users/jobs/apply-job`, {jobId,token},{      headers: {
    Authorization: `Bearer ${token}`
  }})).data})