export type UserInfo = {
    _id: string
    name: string
    email: string
    token: string
    accountType: string;
    firstName: string;
    jobTitle: string;
    profileUrl: string;
    lastName: string;
    contact: string;
    location: string;
    about: string;
  }
export type AdminInfo = {
  _id:string
  email:string
  token:string
}
export type HirerInfo = {
  _id:number
  name:string
  email:string
  token:string
  image:string

}