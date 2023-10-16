export type Jobs = {
    id: number;
    recruiterId:number
    title: string;
    qualification: string;
    company: string;
    requirements:string
    location: string;
    salary: number;
    description: string;
    shifts: string;
    benefits: string;
    countOfStaffNeeded: number;
};



export type Job = {
    id:number |null
    recruiterId:number
    title : String
    qualification : String
    company : String
    location : String
    salary : string
    description : String
    requirements:string
    shifts : String
    benefits  :String
    countOfStaffNeeded: string

}