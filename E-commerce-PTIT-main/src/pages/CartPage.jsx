import { useDispatch } from "react-redux"
import Footer from "../components/Layout/Footer/Footer"
import Header from "../components/Layout/Header/Header"
import Cart from "../components/Route/Cart/Cart"
import { useEffect } from "react"
import { getOwnInformation } from "../redux/reducer/UserSlice"

const CartPage = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getOwnInformation())
    },[dispatch])
    return (
        <>
            <Header/>
            <Cart/>
            <Footer/>
        </>
    )
}
export default CartPage