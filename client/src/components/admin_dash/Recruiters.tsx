import React, { useContext, useEffect, useState } from "react";
import { Await, useLocation, useNavigate } from "react-router-dom";
import Header from "../header/Header";
import CompanyCard from "../user_dash/RecruiterCard";
import CustomButton from "../button/CustomButton";
import ListBox from "../user_dash/ListBox";
import LoadingBox from "../loadingBox/LoadingBox";
import { useGetCompQuery, useGetRecruitersQuery, usegetCompMutation } from "../../hooks/adminHooks";
import { Store } from "../../store/Store";
import { updateURL } from "../../hooks/fileUpload";





const Companies: React.FC = () => {


  const [page, setPage] = useState<number>(1);
  const [numPage, setNumPage] = useState<number>(1);
  const [recordsCount, setRecordsCount] = useState<number>(0);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cmpLocation, setCmpLocation] = useState<string>("");
  const [sort, setSort] = useState<string>("Newest");
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { state, dispatch } = useContext(Store)
  const { adminInfo, Recruiters } = state
  const token = adminInfo.token
  const [data, setData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { mutateAsync: fetchJobs } = usegetCompMutation()
  // const { data: res, isLoading, error } = useGetCompQuery(adminInfo.token,newUrl);
  // console.log(res);
  const newUrl = {
    pageNum: page,
    query: searchQuery,
    cmploc: cmpLocation,
    sort: sort,
  }
const fetchJobss = async () => {
    const res = await fetchJobs({
      token,
      newUrl
    })
    console.log(res);
    if (res) {
      dispatch({ type: 'STORE_RECRUITERS', payload: res.data });
      setNumPage(res?.data.numOfPage);
      setRecordsCount(res?.data.total)
      setPage(res?.data.page)
      setData(res?.data)
    }
  }




  useEffect(() => {
    fetchJobss()
  }, [Recruiters,page,sort]);

   
  const handleSearchSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      await fetchJobss()
    } catch (error) {
      console.log(error);
      
    }
    await fetchJobss()
  };
  console.log(sort);

  const handleShowMore = () => {

    // Add your "Load More" logic here
  };




  return (
    <div className="main-container">
      <div className="w-full">
        <Header
          type=""
          title="Find Your Dream Company"
          handleClick={async (e) => await handleSearchSubmit(e)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          location={cmpLocation}
          setLocation={setCmpLocation}
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
