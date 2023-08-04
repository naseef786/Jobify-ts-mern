import React from 'react'
import CandidteRouter from './routes/candidateRouter/CadidateRouter'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HirerRouter from './routes/hirerRouter/HirerRouter';
import AdminRouter from './routes/adminRouter/AdminRouter';
import { HelmetProvider } from 'react-helmet-async';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';

function App() {


  return (
    <HelmetProvider>

      <BrowserRouter>
        <ToastContainer position="bottom-center" limit={1} />

        <Routes>
          <Route path={'/*'} element={<CandidteRouter />} />
          <Route path={'/admin/*'} element={<AdminRouter />} />
          <Route path={'/hirer/*'} element={<HirerRouter/>} />
        </Routes>

      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />

    </HelmetProvider>
  )
}

export default App
