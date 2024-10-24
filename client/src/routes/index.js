import { lazy } from 'react'
const Dashboard = lazy(() => import('../components/Dashboard'))
const Students = lazy(() => import('../pages/protected/Students'))
const LibraryRecords = lazy(() => import('../pages/protected/LibraryRecords'))
const FeeRecords = lazy(() => import('../pages/protected/FeeRecords.js'))
const UnpaidFees = lazy(() => import('../pages/protected/UnpaidFees.js'))
const AddFees = lazy(() => import('../pages/protected/AddFees.js'))
const AddStudents = lazy(() => import('../pages/protected/AddStudents'))
const EditStudents = lazy(() => import('../pages/protected/EditStudents'))
const AddLibraryRecords = lazy(() => import('../pages/protected/AddLibraryRecords'))
const OverdueRecords = lazy(() => import('../pages/protected/OverdueRecords.js'))
const AddBook = lazy(() => import('../pages/protected/AddBook.js'))
const ListUser = lazy(() => import('../pages/protected/ListUser.js'))
const AddUser = lazy(() => import('../pages/protected/AddUser.js'))

const routes = [
  {
    path: '/dashboard', 
    component: Dashboard, 
  },
  {
    path: '/students',
    component: Students,
  },
  {
    path: '/addstudents',
    component: AddStudents,
  },
  {
    path: '/editstudents/*',
    component: EditStudents,
  },
  {
    path: '/libraryrecords',
    component: LibraryRecords,
  },
  {
    path: '/borrowbooks',
    component: AddLibraryRecords,
  },
  {
    path: '/overdue',
    component: OverdueRecords,
  },
  {
    path: '/feehistory',
    component: FeeRecords,
  },
  {
    path: '/addFees',
    component: AddFees,
  },
  {
    path: '/addBook',
    component: AddBook,
  },   
  {
    path: '/unpaidFees',
    component: UnpaidFees,
  },   
  {
    path: '/users',
    component: ListUser,
  },  
  {
    path: '/adduser',
    component: AddUser,
  },
]

export default routes
