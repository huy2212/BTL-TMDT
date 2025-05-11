import React, { useEffect } from 'react'
import Header from '../components/Layout/Header/Header'
import Footer from '../components/Layout/Footer/Footer'
import { Willist } from '../components/Route/Willist/Willist'
import { useDispatch } from 'react-redux'
import { fetchWillist } from '../redux/reducer/WillistSlice'

export const WillistPage = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchWillist())
    },[])
    return (
        <div>
            <div>
                <Header />
                {/* <SearchProducts query={query} /> */}
                <Willist />
                <Footer />
            </div>
        </div>
    )
}
