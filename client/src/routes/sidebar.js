/** Icons are imported separatly to reduce build time */
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon'
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'
import CodeBracketSquareIcon from '@heroicons/react/24/outline/CodeBracketSquareIcon'
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon'
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'



const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`



const studentmenuroutes = {
  path: '', //no url needed as this has submenu
  icon: <UserIcon className={`${iconClasses} inline` }/> , // icon component
  name: 'Student', // name that appear in Sidebar
  submenu : [
    {
      path: '/app/students',
      icon: <DocumentIcon className={submenuIconClasses}/>,
      name: 'Student Listing',
    },
    {
      path: '/app/addstudents',
      icon: <DocumentIcon className={submenuIconClasses}/>,
      name: 'Add Students',
    },

  ]
}


const usermenuroutes = {
  path: '', //no url needed as this has submenu
  icon: <UserIcon className={`${iconClasses} inline` }/> , // icon component
  name: 'Users', // name that appear in Sidebar
  submenu : [
    {
      path: '/app/users',
      icon: <DocumentIcon className={submenuIconClasses}/>,
      name: 'User Listing',
    },
    {
      path: '/app/adduser',
      icon: <DocumentIcon className={submenuIconClasses}/>,
      name: 'Add Users',
    },

  ]
}


const feemenuroutes = {
  path: '', //no url needed as this has submenu
  icon: <CurrencyDollarIcon className={`${iconClasses} inline` }/>, // icon component
  name: 'Fee Management', // name that appear in Sidebar
  submenu : [
    {
      path: '/app/feehistory', // url
      icon: <ExclamationTriangleIcon className={submenuIconClasses}/>,
      name: 'Fee History', // name that appear in Sidebar
    },
    {
      path: '/app/unpaidfees',
      icon: <TableCellsIcon className={submenuIconClasses}/>, 
      name: 'Unpaid Fees',
    },
    {
      path: '/app/addfees',
      icon: <CodeBracketSquareIcon className={submenuIconClasses}/>, 
      name: 'Add Fees',
    }
  ]
}

const librarymenuroutes = {
  path: '', //no url needed as this has submenu
  icon: <TableCellsIcon className={`${iconClasses} inline` }/>, 
  name: 'Library', // name that appear in Sidebar
  submenu : [
    {
      path: '/app/libraryrecords', //url
      icon: <UserIcon className={submenuIconClasses}/>, // icon component
      name: 'Library History', // name that appear in Sidebar
    },
    {
      path: '/app/borrowbooks',
      icon: <WalletIcon className={submenuIconClasses}/>,
      name: 'Borrow books',
    },
    {
      path: '/app/overdue',
      icon: <WalletIcon className={submenuIconClasses}/>,
      name: 'Late returns',
    },
    {
      path: '/app/addbook', // url
      icon: <UsersIcon className={submenuIconClasses}/>, // icon component
      name: 'AddBook', // name that appear in Sidebar
    },
  ]
}

const adminroutes = [

  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'Dashboard',
  },
  usermenuroutes,
  studentmenuroutes,
  librarymenuroutes,
  feemenuroutes,
  
  
]



const staffroutes = [

  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'Dashboard',
  },
  studentmenuroutes,
  feemenuroutes,
  
  
]



const librarianroutes = [

  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'Dashboard',
  },
  librarymenuroutes,
 
]




export { adminroutes, librarianroutes, staffroutes}


