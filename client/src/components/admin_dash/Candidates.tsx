import React, { useContext } from 'react'
import LoadingBox from '../loadingBox/LoadingBox'
import MessageBox from '../messageBox/MessageBox'
import { ApiError } from '../../types/ApiError'
import { getError } from '../../utils'
import { Store } from '../../store/Store'
import { useGetCandidatesQuery } from '../../hooks/adminHooks'
import { BsTypeH1 } from 'react-icons/bs'

const Candidates : React.FC = () => {
  const { state, dispatch } = useContext(Store)
  const { adminInfo } = state
  const token = adminInfo.token
  const { data: Candidates, isLoading, error } = useGetCandidatesQuery(token);

console.log(Candidates);




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
        {Candidates && Candidates.length > 0 ?(

         
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4 text-blue-700">#</th>
              <th scope="col" className="px-6 py-4 text-blue-700">First</th>
              <th scope="col" className="px-6 py-4 text-blue-700">Last</th>
              <th scope="col" className="px-6 py-4 text-blue-700">Handle</th>
            </tr>
          </thead>
          <tbody>
          |{Candidates?.map((data)=>(
            <tr className="border-b dark:border-neutral-500">
              <td className="whitespace-nowrap text-blue-400 px-6 py-4 font-medium">{data._id}</td>
              <td className="whitespace-nowrap text-blue-400 px-6 py-4">{data.name}</td>
              <td className="whitespace-nowrap text-blue-400 px-6 py-4">{data.updatedAt}</td>
              <td className="whitespace-nowrap text-blue-400 px-6 py-4">{data.email}</td>
            </tr>
          ))}
          </tbody>
        </table>
        ):(<h1>
          no candidates registerd yet
        </h1>)}
      </div>
    </div>
  </div>
</div>


    </div>

  )
}

export default Candidates