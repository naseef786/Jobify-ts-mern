import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StoreProvider } from './store/Store.tsx';
import AdminRouter from './routes/adminRouter/AdminRouter.tsx';



const queryClient = new QueryClient
StoreProvider
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode >
    <StoreProvider>     
    <QueryClientProvider client={queryClient}>
    <App />
    </QueryClientProvider>
    </StoreProvider>
  </React.StrictMode>,
)
