import { lazy } from 'react'

const Dashboard = lazy(()=> import("../pages/admin/Dashboard"))
const Promotion = lazy(()=> import('../pages/admin/Promotion'))
const UserManager = lazy(()=> import('../pages/admin/UserManager'))
const ProductManager = lazy(()=> import('../pages/admin/ProductManager'))
const Voucher = lazy(()=> import('../pages/admin/Voucher'))
const Bill = lazy(()=> import('../pages/admin/Bill'))
const Category = lazy(()=> import('../pages/admin/Category'))

export {Dashboard,Promotion,UserManager,ProductManager,Voucher,Bill,Category}