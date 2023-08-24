import { useMutation } from '@tanstack/react-query'
import apiClient from '../axios/apiClient'
import { AdminInfo } from '../types/UserInfo'



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
