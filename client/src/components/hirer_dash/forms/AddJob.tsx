import React, { useState, ChangeEvent, FormEvent } from 'react';


interface Job {
  title: string;
  qualification: string;
  company: string;
  location: string;
  salary: string;
  description: string;
  shifts: string;
  benefits: string;
  countOfStaffNeeded: string;
}

const AddJobForm: React.FC = () => {
  const [job, setJob] = useState<Job>({
    title: '',
    qualification: '',
    company: '',
    location: '',
    salary: '',
    description: '',
    shifts: '',
    benefits: '',
    countOfStaffNeeded: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setJob({
      ...job,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Add code to send the job data to your backend (via Axios or similar)
    console.log('Job Data:', job);
    // Reset the form after submission
    setJob({
      title: '',
      qualification: '',
      company: '',
      location: '',
      salary: '',
      description: '',
      shifts: '',
      benefits: '',
      countOfStaffNeeded: '',
    });
    console.log(job)
  };

  return (
    <div className="main-container">
    <form onSubmit={handleSubmit} className="form max-w-3xl mx-auto p-4 bg-white shadow-lg rounded-md">
    <div className="mb-4">
      <label htmlFor="company" className=" block text-gray-700 font-bold mb-2">COMPANY</label>
      <input
        type="text"
        id="company"
        name="company"
        value={job.company}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border border-gray-300  text-black rounded focus:outline-none focus:border-indigo-500"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description</label>
      <textarea
        id="description"
        name="description"
        value={job.description}
        onChange={handleChange}
        required
        className="w-full px-3 py-2 border text-black  border-gray-300 rounded focus:outline-none focus:border-indigo-500"
      />
    </div>
    <div className="mb-4">
    <label htmlFor="title" className="block text-gray-700 font-bold mb-2" >Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={job.title}
              onChange={handleChange}
              required
               className="w-full px-3 py-2 border text-black  border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
    </div>
    <div className="mb-4">
    <label htmlFor="shifts" className="block text-gray-700 font-bold mb-2" >Shifts</label>
            <input
              type="text"
              id="shifts"
              name="shifts"
              value={job.shifts}
              onChange={handleChange}
              required
               className="w-full px-3 py-2 border text-black  border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
    </div>
    <div className="mb-4">
    <label htmlFor="countOfStaffNeeded" className="block text-gray-700 font-bold mb-2" >Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={job.location}
              onChange={handleChange}
              required
               className="w-full px-3 py-2 border text-black  border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
    </div>
    <div className="mb-4">
    <label htmlFor="benefits" className="block text-gray-700 font-bold mb-2" >Benefits</label>
            <input
              type="text"
              id="benefits"
              name="benefits"
              value={job.benefits}
              onChange={handleChange}
              required
               className="w-full px-3 py-2 border text-black  border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
    </div>
    <div className="mb-4">
    <label htmlFor="countOfStaffNeeded" className="block text-gray-700 font-bold mb-2" >Count of Staff Needed</label>
            <input
              type="number"
              id="countOfStaffNeeded"
              name="countOfStaffNeeded"
              value={job.countOfStaffNeeded}
              onChange={handleChange}
              required
               className="w-full px-3 py-2 border text-black  border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
    </div>
    <div className="mb-4">
    <label htmlFor="countOfStaffNeeded" className="block text-gray-700 font-bold mb-2" >qualification</label>
            <input
              type="text"
              id="qualification"
              name="qualification"
              value={job.qualification}
              onChange={handleChange}
              required
               className="w-full px-3 py-2 border text-black  border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
    </div>
    <div className="mb-4">
    <label htmlFor="countOfStaffNeeded" className="block text-gray-700 font-bold mb-2" >salary</label>
            <input
              type="number"
              id="salary"
              name="salary"
              value={job.salary}
              onChange={handleChange}
              required
               className="w-full px-3 py-2 border text-black  border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            />
    </div>
    <div className="mb-4"></div>
    
    <button type="submit" className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
      Add Job
    </button>
    </form>
    </div>
  );
};

export default AddJobForm;


// <form className="w-full max-w-lg">
// <div className="flex flex-wrap -mx-3 mb-6">
//   <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
//     <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
//       First Name
//     </label>
//     <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane" />
//     <p className="text-red-500 text-xs italic">Please fill out this field.</p>
//   </div>
//   <div className="w-full md:w-1/2 px-3">
//     <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
//       Last Name
//     </label>
//     <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" />
//   </div>
// </div>
// <div className="flex flex-wrap -mx-3 mb-6">
//   <div className="w-full px-3">
//     <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-password">
//       Password
//     </label>
//     <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-password" type="password" placeholder="******************" />
//     <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
//   </div>
// </div>
// <div className="flex flex-wrap -mx-3 mb-2">
//   <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//     <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
//       City
//     </label>
//     <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" placeholder="Albuquerque" />
//   </div>
//   <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//     <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
//       State
//     </label>
//     <div className="relative">
//       <select className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
//         <option>New Mexico</option>
//         <option>Missouri</option>
//         <option>Texas</option>
//       </select>
//       <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//         <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
//       </div>
//     </div>
//   </div>
//   <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
//     <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-zip">
//       Zip
//     </label>
//     <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" placeholder={90210} />
//   </div>
// </div>
// </form>