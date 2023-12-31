

import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import CompanyCard from "../user_dash/RecruiterCard";
import CustomButton from "../button/CustomButton";
import ListBox from "../user_dash/ListBox";
import LoadingBox from "../loadingBox/LoadingBox";
import { useGetCandidatesQuery, useGetRecruitersQuery } from "../../hooks/adminHooks";
import { Store } from "../../store/Store";


const Candidates: React.FC = () => {


  const [page, setPage] = useState<number>(1);
  const [numPage, setNumPage] = useState<number>(1);
  const [recordsCount, setRecordsCount] = useState<number>(0);
 
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cmpLocation, setCmpLocation] = useState<string>("");
  const [sort, setSort] = useState<string>("Newest");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const {state,dispatch} =useContext(Store)
  const {adminInfo,Candidates,hirerInfo} = state

  const { data: candidates, isLoading, error } = useGetCandidatesQuery(hirerInfo.token);

console.log(candidates);


useEffect(() => {
  // Fetch jobs from your backend server
  setIsFetching(true)
  if(candidates) dispatch({ type: 'STORE_CANDIDATES', payload: candidates});
   
}, [dispatch,candidates]);

 const [data, setData] = useState(Candidates ?? []);
  const location = useLocation();
  const navigate = useNavigate();

  const filteredUsers = Candidates?.filter(user => user !== null && user !== undefined && user.length !== 0);

  const handleSearchSubmit = () => {
    
  };

  const handleShowMore = () => {
   
  };




  return (
    <div className="main-container">
    <div className="w-full">
      <Header
        type=""
        title="Find Your Dream Company"
        handleClick={handleSearchSubmit}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        location={cmpLocation}
        setLocation={setSearchQuery}
      />

      <div className="container mx-auto flex flex-col gap-5 2xl:gap-10 px-5 md:px-0 py-6 bg-[#f7fdfd]">
        <div className="flex items-center justify-between mb-4" >
          <p className="text-sm md:text-base">
            Showing: <span className="font-semibold">{filteredUsers?.length}</span> Companies Available
          </p>

          <div className="flex flex-col md:flex-row gap-0 md:gap-2 md:items-center">
            <p className="text-sm md:text-base">Sort By:</p>

            <ListBox sort={sort} setSort={setSort} />
          </div>
        </div>

        <div className="w-full flex flex-col gap-6">
          {filteredUsers?.map((cmp, index) => (
                <div key={index} className='w-full h-16 flex gap-4 items-center justify-between bg-white shadow-md rounded'>
                <div className='w-3/4 md:w-2/4 flex gap-4 items-center'>
                  <Link to={`/recruiter-profile/${cmp?._id}`}>
                    <img
                      src={cmp?.profileUrl}
                      alt={cmp?.name}
                      className='w-8 md:w-12 h-8 md:h-12 rounded'
                    />
                  </Link>
                  <div className='h-full flex flex-col'>
                    <Link
                      to={`/recruiter-profile/${cmp?._id}`}
                      className='text-base md:text-lg font-semibold text-gray-600 truncate'
                    >
                      {cmp?.name}
                    </Link>
                    <span className='text-sm text-blue-600'>{cmp?.email}</span>
                  </div>
                </div>
          
                <div className='hidden w-1/4 h-full md:flex items-center'>
                  <p className='text-base text-start'>{cmp?.location}</p>
                </div>
          
                <div className='w-1/4 h-full flex flex-col items-center'>
                  <p className='text-blue-600 font-semibold'>{cmp?.appliedJobs?.length}</p>
                  <span className='text-xs md:base font-normal text-gray-600'>
                    Jobs applied
                  </span>
                </div>
              </div>
          ))}

          {isFetching && (
            <div className="mt-10">
              <LoadingBox />
            </div>
          )}

          <p className="text-sm text-right">
            {data?.length} records out of {recordsCount}
          </p>
        </div>

        {numPage > page && !isFetching && (
          <div className="w-full flex items-center justify-center pt-16">
            <CustomButton
              onClick={handleShowMore}
              title="Load More"
              containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
            />
          </div>
        )}
      </div>
    </div>
    </div>
  );
};

export default Candidates;
