import { lazy } from 'react'

const Import = lazy(()=> import("../pages/employee/Import"))

const Bill = lazy(()=> import('../pages/employee/Bill'))

export {Import,Bill}