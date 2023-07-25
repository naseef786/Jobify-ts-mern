import apiClient from "../axios/apiClient"
import { Jobs } from "../types/Jobs"
import {useQuery,useMutation} from '@tanstack/react-query'


export const useGetJobsQuery = () => {
   return useQuery({
        queryKey:['jobs'],
        queryFn: async ()=>( await apiClient.get<Jobs[]>(`/api/jobs`)).data
        
    })
}

// export const useGetJobsQuery = () => {
//     return useQuery<Jobs[], Error>('jobs', async () => {
//       const response = await apiClient.get<Jobs[]>('api/jobs');
//       return response.data;
//     });
//   };
// export const useGetJobsQuery = () => {
//     return useQuery('jobs', async () => {
//       const response = await apiClient.get(`api/jobs`);
//       return response.data;
//     });
//   };