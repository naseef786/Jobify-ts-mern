import React, { useContext, useEffect } from 'react'
import { Store } from '../../store/Store'
import { useGetRecruitersQuery } from '../../hooks/adminHooks'
import LoadingBox from '../loadingBox/LoadingBox'
import MessageBox from '../messageBox/MessageBox'
import { getError } from '../../utils'
import { ApiError } from '../../types/ApiError'

const Recruiters : React.FC = () => {
  const { state, dispatch } = useContext(Store)
  const { adminInfo } = state
  const token = adminInfo.token
  const { data: recruiters, isLoading, error } = useGetRecruitersQuery(token);

  // useEffect(() => {
  //   // Fetch jobs from your backend server
  //   if(jobs) dispatch({ type: 'STORE_JOBS', payload: jobs });
     
  // }, [dispatch,jobs]);



  if (isLoading) {
    return <LoadingBox />;
  }

  if (error) {
    return <MessageBox variant="danger">{getError(error as ApiError)}</MessageBox>;
  }

  return (
  <div className="main-container">
<div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4 text-blue-700">#</th>
              <th scope="col" className="px-6 py-4 text-blue-700">Name</th>
              <th scope="col" className="px-6 py-4 text-blue-700">company name</th>
              <th scope="col" className="px-6 py-4 text-blue-700">phnoe</th>
            </tr>
          </thead>
          <tbody>
            {recruiters && recruiters.length > 0 ?
            recruiters?.map((data)=>(

              <tr key={data.id} className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap text-blue-400 px-6 py-4 font-medium">{data.id}</td>
              <td className="whitespace-nowrap text-blue-400 px-6 py-4">{data.name}</td>
              <td className="whitespace-nowrap text-blue-400 px-6 py-4">{data.company}</td>
              <td className="whitespace-nowrap text-blue-400 px-6 py-4">{data.phone}</td>
            </tr>
              
            )):(
              
              <h1>no recruiters have registered</h1>
            )}
          
            {/* <tr className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-6 py-4 font-medium">2</td>
              <td className="whitespace-nowrap px-6 py-4">Jacob</td>
              <td className="whitespace-nowrap px-6 py-4">Thornton</td>
              <td className="whitespace-nowrap px-6 py-4">@fat</td>
            </tr>
            <tr className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap px-6 py-4 font-medium">3</td>
              <td className="whitespace-nowrap px-6 py-4">Larry</td>
              <td className="whitespace-nowrap px-6 py-4">Wild</td>
              <td className="whitespace-nowrap px-6 py-4">@twitter</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>


    </div>

  )
}

export default Recruiters