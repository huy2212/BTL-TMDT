import React, { useEffect, useState } from 'react';
import Voucher from '../Voucher/Voucher';
import { useDispatch, useSelector } from 'react-redux';
import { formatCurrency } from '../../basicFunction';
import voucherSlice from '../../../redux/reducer/VoucherSlice';
import { notify } from '../../Admin/notify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Vouchers = (props) => {
    const dispatch = useDispatch()
    const message = useSelector((state)=> state.voucher.alert)
    const [vouchers, setVouchers] = useState([])

    useEffect(() => {
        if (message !== undefined) notify(message.message, message.code)
        return () => {
          dispatch(voucherSlice.actions.resetAlert(undefined))
        }
      }, [message, dispatch])
    const voucherList = useSelector(state => state.voucher.vouchers)
    useEffect(() => {
        let tmpList = []
        voucherList.map(voucher => {
            if (voucher.numberRemain > 0) tmpList.push({
                id: voucher.id,
                name: voucher.name,
                description: `Giảm giá ${voucher.discount}% tối đa ${formatCurrency(voucher.discountConditions)}`,
                discount: voucher.discount,
                number_voucher: voucher.numberVoucher,
                numbber_remaining: voucher.numberRemain,
                start_date: voucher.startDate,
                end_date: voucher.endDate
            })
        })
        setVouchers(tmpList.slice(0, 3))
    }, [voucherList])
    return (
        <div className='flex justify-around max-h-24 gap-x-2 px-4 mb-8 flex-wrap gap-y-4'>
            {vouchers[0] && <div>
                <Voucher data={vouchers[0]} />
            </div>}
            {vouchers[1] && <div className={`hidden md:block`} >
                <Voucher data={vouchers[1]} />
            </div>}
            {vouchers[2] && <div className={`hidden lg:block`} >
                <Voucher data={vouchers[2]} />
            </div>}

            {/* <ToastContainer></ToastContainer> */}
        </div>
    );
};

export default Vouchers;