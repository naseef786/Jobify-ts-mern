export type Jobs = {
    id: string;
    recruiterId:number
    title: string;
    qualification: string;
    company: string;
    requirements:string
    location: string;
    salary: number;
    description: string;
    shifts: string;
    jobType:string;
    benefits:string;
    createdAt:string;
    vaccancy:string
    applicants:[]
    countOfStaffNeeded: number;
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