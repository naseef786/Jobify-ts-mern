export type Jobs = {
    _id: string;
    recruiterId: {
      profileUrl: string;
      name: string;
      _id:number
      about:string
    };
    jobTitle: string;
    location: string;
    detail: Array<{
      desc: string;
    }>
    qualification: string;
    
    requirements:string
    salary: string;
    description: string;
    shifts: string;
    jobType:string;
    benefits:string;
    createdAt:string;
    vaccancy:string;
    profileUrl:string
    applicants:[]
    countOfStaffNeeded: string;
};



export type Job = {
    _id:string
    jobTitle : string
    vaccancy:string
    qualification : string
    recruiterId: {
      profileUrl: string;
      name: string;
      about:string
    };
    location : string
    salary : string
    description : string
    requirements:string
    shifts : string
    benefits  :string
    countOfStaffNeeded: string
    createdAt:string;
    profileUrl:string;
    jobType:string;
    applicants:[]

}