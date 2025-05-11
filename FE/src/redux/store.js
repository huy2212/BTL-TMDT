import { configureStore } from "@reduxjs/toolkit";
import usersSlice from './reducer/UserSlice'
import categorySlice from "./reducer/CategorySlice";
import voucherSlice from "./reducer/VoucherSlice";
import productSlice from "./reducer/ProductSlice";
import promotionSlice from "./reducer/PromotionSlice";
import supplierSlice from "./reducer/SupplierSlice";
import cartSlice from "./reducer/CartSlice";
import reviewSlice from "./reducer/ReviewSlice";
import shipmentSlice from "./reducer/ShipmentSlice";
import paymentSlice from "./reducer/PaymentSlice";
import orderSlice from "./reducer/OrderSlice";
import ImportSlice from "./reducer/ImportSlice";
import StatisticSlice from "./reducer/StatisticSlice";
import willistSlice from "./reducer/WillistSlice";

const store = configureStore({
    reducer: {
        users: usersSlice.reducer,
        category: categorySlice.reducer,
        voucher: voucherSlice.reducer,
        product: productSlice.reducer,
        promotion: promotionSlice.reducer,
        supplier :supplierSlice.reducer,
        cart : cartSlice.reducer,
        review: reviewSlice.reducer,
        shipment: shipmentSlice.reducer,
        payment: paymentSlice.reducer,
        order: orderSlice.reducer,
        import: ImportSlice.reducer,
        statistic: StatisticSlice.reducer,
        willist: willistSlice.reducer
    }
})

export default store