export type Jobs = {
    id: string;
    company: {
      profileUrl: string;
      name: string;
    };
    jobTitle: string;
    location: string;
    detail: Array<{
      desc: string;
    }>;
    
    
    recruiterId:number
    title: string;
    qualification: string;
    
    requirements:string
    salary: string;
    description: string;
    shifts: string;
    jobType:string;
    benefits:string;
    createdAt:string;
    vaccancy:string
    applicants:[]
    countOfStaffNeeded: string;
};



export type Job = {
    id:string
    recruiterId:number
    title : String
    vaccancy:string
    qualification : string
    company : String
    location : String
    salary : string
    description : string
    requirements:string
    shifts : String
    benefits  :String
    countOfStaffNeeded: string
    createdAt:string;
    jobType:string;
    applicants:[]

}