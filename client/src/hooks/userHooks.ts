import { useMutation } from '@tanstack/react-query'
import apiClient from '../axios/apiClient'
import { UserInfo } from '../types/UserInfo'

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


  export const useAdminSigninMutation = () =>
  useMutation({
    mutationFn: async ({
      email,
      password,
      admin
    }: {
      email: string
      password: string
      admin :boolean
    }) =>
      (
        await apiClient.post<UserInfo>(`api/admin/signin`, {
          email,
          password,
          admin
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