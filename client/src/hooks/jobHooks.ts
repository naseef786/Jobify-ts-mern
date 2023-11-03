import apiClient from "../axios/apiClient"
import { Jobs } from "../types/Jobs"
import {useQuery,useMutation} from '@tanstack/react-query'


// export const useGetJobsQuery = () => {
//    return useQuery({
//         queryKey:['jobs'],
//         queryFn: async ()=>( await apiClient.get<Jobs[]>(`/api/jobs`)).data
        
//     })
// }


export const useGetJobsQuery = (token:string) => {
  return useQuery(['jobs'], async () => {
  
 
  
    if (!token) {
      throw new Error('Token not found in local storage'); // Handle case where token is not available
    }

    const response = await apiClient.get<Jobs[]>(`/api/users/jobs/applied`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  });
};
export const useSearchJobsQuery = (searchTerm: string = '',token:string) => {
  return useQuery(['jobs', searchTerm], async () => {
  
  console.log(token);
  
    if (!token) {
      throw new Error('Token not found in local storage'); // Handle case where token is not available
    }

    const response = await apiClient.get<Jobs[]>(`/api/users/jobs/search?search=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return response.data;
  });
};


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


export const usegetJobsMutation = () =>
useMutation({
  mutationFn: async ({
    token,
    newUrl
 
  }:{token:string,newUrl:any}) =>
    (
      await apiClient.get(`/api/users/jobz`, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params:newUrl
      })
    ).data,
})
