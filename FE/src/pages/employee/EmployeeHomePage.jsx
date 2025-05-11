import React, { Suspense, useEffect, useState } from 'react'

import { ThemeProvider, Box, CssBaseline, CircularProgress } from '@mui/material';
import theme from '../../config/theme.js';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SideNav from '../../components/Admin/SideNav.jsx';
import AppHeader from '../../components/Admin/AppHeader.jsx';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { fetchCategory } from '../../redux/reducer/CategorySlice.jsx';
import { fetchProduct } from '../../redux/reducer/ProductSlice.jsx';
import { Bill, Import } from '../../routes/EmployeeRouter.jsx';
function EmployeeHomePage() {
  const dispatch = useDispatch()
  const [sideNavExpanded, setSideNavExpanded] = useState(false)
  useEffect(()=>{
    dispatch(fetchCategory())
    dispatch(fetchProduct())
  },[])
  return (
    <React.Fragment>
      <ThemeProvider theme={theme} >
        <CssBaseline />
        <AppHeader setSideNavExpanded={setSideNavExpanded} sideNavExpanded={sideNavExpanded} />
        <Box sx={style.container} >
          <SideNav sideNavExpanded={sideNavExpanded} />
          <Box component={'main'} sx={style.mainSection}>
            <Suspense fallback={<CircularProgress />}>
              <Routes>
                <Route path='/' element={<Bill />} />
                <Route path='/import' element={<Import />} />
              </Routes>
            </Suspense>
          </Box>
        </Box>
      </ThemeProvider>
      <ToastContainer></ToastContainer>
    </React.Fragment>
  )
}
/**  @type {import("@mui/material").SxProps} */
const style = {
  container: {
    display: 'flex',
    bgcolor: 'neutral.light',
    height: 'calc(100% - 64px)'
  },
  mainSection: {
    p: 4,
    height: "100%",
    width: "100%",
    overflow: "auto"
  }
}
export default EmployeeHomePage
