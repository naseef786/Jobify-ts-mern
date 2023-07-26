import bcrypt from 'bcryptjs'
import { User } from './models/userModel'
import { Job } from './models/jobModel'

export const jobs: Job[] = [
  {
    title: 'web developer',
    description: 'mernstack',
    company: 'bridgeon1',
    salary: 12000,
    location: "calicut,kerala",
    requirements: 'kfjlksjf,ifj,kofm',
    datePosted: "14/08/2023",

   
  },
  {
    title: 'web developer',
    description: 'mernstack',
    company: 'bridgeon2',
    salary: 12000,
    location: "calicut,kerala",
    requirements: 'kfjlksjf,ifj,kofm',
    datePosted: "24/08/2023",

   
  },
  {
    title: 'web developer',
    description: 'mernstack',
    company: 'bridgeon3',
    salary: 12000,
    location: "calicut,kerala",
    requirements: 'kfjlksjf,ifj,kofm',
    datePosted: "04/08/2023",

   
  },
  {
    title: 'web developer',
    description: 'mernstack',
    company: 'bridgeon4',
    salary: 12000,
    location: "calicut,kerala",
    requirements: 'kfjlksjf,ifj,kofm',
    datePosted: "4/08/2023",

   
  },
 
]

export const sampleUsers: User[] = [
  {
    name: 'Joe',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: true,
  },
  {
    name: 'John',
    email: 'user@example.com',
    password: bcrypt.hashSync('123456'),
    isAdmin: false,
  },
]