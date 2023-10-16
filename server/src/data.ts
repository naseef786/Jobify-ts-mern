import bcrypt from 'bcryptjs'
import { User } from '../models/userModel'
import { Job } from '../models/jobModel'

// export const jobs: Job[] = [
//   {
//     title: 'web developer',
//     description: 'mernstack',
//     company: 'bridgeon1',
//     salary: 12000,
//     location: "calicut,kerala",
//     requirements: 'kfjlksjf,ifj,kofm',
//     datePosted: "14/08/2023",

   
//   },
//   {
//     title: 'web developer',
//     description: 'mernstack',
//     company: 'bridgeon2',
//     salary: 12000,
//     location: "calicut,kerala",
//     requirements: 'kfjlksjf,ifj,kofm',
//     datePosted: "24/08/2023",

   
//   },
//   {
//     title: 'web developer',
//     description: 'mernstack',
//     company: 'bridgeon3',
//     salary: 12000,
//     location: "calicut,kerala",
//     requirements: 'kfjlksjf,ifj,kofm',
//     datePosted: "04/08/2023",

   
//   },
//   {
//     title: 'web developer',
//     description: 'mernstack',
//     company: 'bridgeon4',
//     salary: 12000,
//     location: "calicut,kerala",
//     requirements: 'kfjlksjf,ifj,kofm',
//     datePosted: "4/08/2023",

   
//   },
 
// ]

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

export const jobs: Job[] = [
  {
    title: 'Software Engineer',
    qualification: 'Bachelor’s degree in Computer Science or equivalent',
    companyName: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    salary: '85000',
    description: 'We are looking for a skilled Software Engineer with expertise in full-stack development using MERN stack.',
    shifts: 'Flexible hours',
    benefits: 'Health insurance, 401(k) matching, Flexible spending accounts',
    workPlace: 'Remote',
    jobType: 'Full-time',

    vaccancy:"s",
    requirements: 'React, Node.js, MongoDB, Express, JavaScript',
  },
  {
    title: 'UX/UI Designer',
    qualification: 'Bachelor’s degree in Design or equivalent',
    companyName: 'DesignHub',
    location: 'New York, NY',
    salary: '70000',
    description: 'DesignHub is seeking a talented UX/UI Designer to join our creative team. You will be responsible for creating engaging and intuitive user interfaces.',
    shifts: 'Standard business hours',
    benefits: 'Dental and vision coverage, Paid time off',
    vaccancy:"s",
    workPlace: 'On-site',
    jobType: 'Contract',
    requirements: 'Sketch, Figma, Adobe Creative Suite',
  },
  {
    title: 'Data Analyst',
    qualification : 'Bachelors degree in Statistics or related field',
    companyName: 'DataInsight',
    location: 'Seattle, WA',
    salary: '75000',
    description: 'DataInsight is looking for a Data Analyst to interpret data and turn it into information which can offer ways to improve a business, thus affecting business decisions.',
    shifts: 'Day Shift',
    benefits: 'Health and wellness benefits, Stock options',
    vaccancy:"s",
    workPlace: 'Hybrid',
    jobType: 'Full-time',
    requirements: 'SQL, Excel, Data visualization tools (e.g., Tableau)',
  },
];
