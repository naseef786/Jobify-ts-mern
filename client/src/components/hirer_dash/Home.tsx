import React, { useContext, useEffect } from 'react';
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { Store } from '../../store/Store';
import { useGetCandidatesQuery, useGetRecruitersQuery } from '../../hooks/adminHooks';
import { useGetJobsQuery } from '../../hooks/jobHooks';


const Home: React.FC = () => {
  const { state, dispatch } = useContext(Store)
  const { hirerInfo } = state
  const token = hirerInfo.token
  const { data: recruiters,  } = useGetRecruitersQuery(token);
  const { data: Candidates,  } = useGetCandidatesQuery(token);
  const {data:Jobs} =useGetJobsQuery(token)

  return (
    <main className='main-container'>
      <div className='main-title'>
        <h3>DASHBOARD</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3>POST A JOB</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1></h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
          
            <Link to='/admin/recruiters'>   <h3>Recruiters</h3></Link>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1>{recruiters?.length}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
           
            <Link to='/admin/candidates'>  <h3>Candidates applied</h3></Link>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1>{Candidates?.length}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
           
            <Link to='/admin/jobposts'> <h3>Total jobs posted</h3></Link>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1>{Jobs?.length}</h1>
        </div>
        <div className="block max-w-[18rem] rounded-lg bg-neutral-800 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-600">
          {/* <div className="border-b-2 border-[#0000002d] px-6 py-3 text-white dark:text-neutral-50">
    Header
  </div> */}
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight text-white dark:text-neutral-50">
              Dark card title
            </h5>
            <p className="text-base text-white dark:text-neutral-50">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div className="block max-w-[18rem] rounded-lg border border-success bg-transparent shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:border-success-300 dark:bg-neutral-600">
          <div className="border-b-2 border-success px-6 py-3 text-neutral-600 dark:border-success-300 dark:text-neutral-50">
            Header
          </div>
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight text-success dark:text-success-300">
              Success card title
            </h5>
            <p className="text-base text-success dark:text-success-300">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
          <div className="border-t-2 border-success px-6 py-3 text-neutral-600 dark:border-success-300 dark:text-neutral-50">
            Footer
          </div>
        </div>


        <div className="block max-w-[18rem] rounded-lg bg-neutral-800 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-600">
          <div className="border-b-2 border-[#0000002d] px-6 py-3 text-white dark:text-neutral-50">
            Header
          </div>
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight text-white dark:text-neutral-50">
              Dark card title
            </h5>
            <p className="text-base text-white dark:text-neutral-50">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div className="block rounded-lg bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700">
        <div className="border-b-2 border-neutral-100 px-6 py-3 dark:border-neutral-600 dark:text-neutral-50">
          Featured
        </div>
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            Special title treatment
          </h5>
          <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
            With supporting text below as a natural lead-in to additional
            content.
          </p>
          <button type="button"  className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]" data-te-ripple-init data-te-ripple-color="light">
            Go somewhere
          </button>
        </div>
      </div>

      <div className="block max-w-[18rem] rounded-lg border border-danger bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:border-danger-300 dark:bg-neutral-600">
        <div className="border-b-2 border-[#0000002d] px-6 py-3 text-neutral-600 dark:text-neutral-50">
          Header
        </div>
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-danger dark:text-danger-300">
            Danger card title
          </h5>
          <p className="text-base text-danger dark:text-danger-300">
            Some quick example text to build on the card title and make up
            the bulk of the card's content.
          </p>
        </div>
      </div>
      <div className="block max-w-[18rem] rounded-lg border border-warning bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:border-warning-300 dark:bg-neutral-600">
        <div className="border-b-2 border-[#0000002d] px-6 py-3 text-neutral-600 dark:text-neutral-50">
          Header
        </div>
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-warning dark:text-warning-300">
            Warning card title
          </h5>
          <p className="text-base text-warning dark:text-warning-300">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
      <div className="block max-w-[18rem] rounded-lg border border-info bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:border-info-300 dark:bg-neutral-600">
        <div className="border-b-2 border-[#0000002d] px-6 py-3 text-neutral-600 dark:text-neutral-50">
          Header
        </div>
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-info dark:text-info-300">
            Info card title
          </h5>
          <p className="text-base text-info dark:text-info-300">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>
      <div className="block max-w-[18rem] rounded-lg border border-neutral-200 bg-white shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:border-neutral-300 dark:bg-neutral-600">
        <div className="border-b-2 border-[#0000002d] px-6 py-3 text-neutral-600 dark:text-neutral-50">
          Header
        </div>
        <div className="p-6">
          <h5 className="mb-2 text-xl font-medium leading-tight text-black dark:text-neutral-50">
            Light card title
          </h5>
          <p className="text-base text-black dark:text-neutral-50">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
        </div>
      </div>

      </div>



    



    </main>
  );
}

export default Home;
