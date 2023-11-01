import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import CompanyCard from "../user_dash/RecruiterCard";
import CustomButton from "../button/CustomButton";
import ListBox from "../user_dash/ListBox";
import LoadingBox from "../loadingBox/LoadingBox";
import { useGetRecruitersQuery } from "../../hooks/adminHooks";
import { Store } from "../../store/Store";


const Companies: React.FC = () => {


  const [page, setPage] = useState<number>(1);
  const [numPage, setNumPage] = useState<number>(1);
  const [recordsCount, setRecordsCount] = useState<number>(0);
 
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cmpLocation, setCmpLocation] = useState<string>("");
  const [sort, setSort] = useState<string>("Newest");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const {state,dispatch} =useContext(Store)
  const {adminInfo,Recruiters} = state

 const { data: recruiters, isLoading, error } = useGetRecruitersQuery(adminInfo.token);


useEffect(() => {
  // Fetch jobs from your backend server
  if(recruiters) dispatch({ type: 'STORE_RECRUITERS', payload: recruiters});
   
}, [dispatch,recruiters]);

 const [data, setData] = useState(recruiters ?? []);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchSubmit = () => {
    // Add your search logic here
  };

  const handleShowMore = () => {
    // Add your "Load More" logic here
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
            Showing: <span className="font-semibold">{Recruiters?.length}</span> Companies Available
          </p>

          <div className="flex flex-col md:flex-row gap-0 md:gap-2 md:items-center">
            <p className="text-sm md:text-base">Sort By:</p>

            <ListBox sort={sort} setSort={setSort} />
          </div>
        </div>

        <div className="w-full flex flex-col gap-6">
          {Recruiters?.map((cmp, index) => (
            <CompanyCard cmp={cmp} key={index} />
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

export default Companies;
