import React from 'react';
import './login.css'
export default function Login(){
  return (
    <div className="pageWrapper">
    <div className="main">
    <div className="Rectangle22" >  <div className="CreateAccount" style={{textAlign: 'center', color: 'white', fontSize: 24, fontFamily: 'Patua One', fontWeight: '400', textTransform: 'uppercase', wordWrap: 'break-word'}}>Log in to your Account</div></div>
    <div  style={{    marginTop: '-18rem'}}>
      <form className='form'>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block font-medium mb-1">
            Password
          </label>
          
          <input
            type="password"
            id="password"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
        className="mb-6" color='blue'  style={{ borderRadius:'4px' ,   marginInline: '1rem',
    marginTop:'6rem'}}>

        <div className="Frame6" style={{width: '100%', height: '100%', padding: 10, background: '#5064CF', borderRadius: 9, border: '0.50px #504B4B solid', justifyContent: 'center', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
    <div className="SignUp" style={{textAlign: 'right', color: '#FFFEFE', fontSize: 16, fontFamily: 'Abyssinica SIL', fontWeight: '400', textTransform: 'uppercase', wordWrap: 'break-word'}}>sign up</div>
</div></button>
      </form>
      </div>
    </div>
  </div>

  );
};


