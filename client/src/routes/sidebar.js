/** Icons are imported separatly to reduce build time */
import BellIcon from '@heroicons/react/24/outline/BellIcon'
import DocumentTextIcon from '@heroicons/react/24/outline/DocumentTextIcon'
import Squares2X2Icon from '@heroicons/react/24/outline/Squares2X2Icon'
import TableCellsIcon from '@heroicons/react/24/outline/TableCellsIcon'
import WalletIcon from '@heroicons/react/24/outline/WalletIcon'
import CodeBracketSquareIcon from '@heroicons/react/24/outline/CodeBracketSquareIcon'
import DocumentIcon from '@heroicons/react/24/outline/DocumentIcon'
import ExclamationTriangleIcon from '@heroicons/react/24/outline/ExclamationTriangleIcon'
import CalendarDaysIcon from '@heroicons/react/24/outline/CalendarDaysIcon'
import ArrowRightOnRectangleIcon from '@heroicons/react/24/outline/ArrowRightOnRectangleIcon'
import UserIcon from '@heroicons/react/24/outline/UserIcon'
import Cog6ToothIcon from '@heroicons/react/24/outline/Cog6ToothIcon'
import BoltIcon from '@heroicons/react/24/outline/BoltIcon'
import ChartBarIcon from '@heroicons/react/24/outline/ChartBarIcon'
import CurrencyDollarIcon from '@heroicons/react/24/outline/CurrencyDollarIcon'
import InboxArrowDownIcon from '@heroicons/react/24/outline/InboxArrowDownIcon'
import UsersIcon from '@heroicons/react/24/outline/UsersIcon'
import KeyIcon from '@heroicons/react/24/outline/KeyIcon'
import DocumentDuplicateIcon from '@heroicons/react/24/outline/DocumentDuplicateIcon'

const iconClasses = `h-6 w-6`
const submenuIconClasses = `h-5 w-5`



const studentroutes = {
  path: '', //no url needed as this has submenu
  icon: <UserIcon className={`${iconClasses} inline` }/> , // icon component
  name: 'Student', // name that appear in Sidebar
  submenu : [
    {
      path: '/students',
      icon: <DocumentIcon className={submenuIconClasses}/>,
      name: 'Student Listing',
    },
    {
      path: '/register', //url
      icon: <ArrowRightOnRectangleIcon className={submenuIconClasses}/>, // icon component
      name: 'Add Student', // name that appear in Sidebar
    },
    {
      path: '/forgot-password',
      icon: <KeyIcon className={submenuIconClasses}/>,
      name: 'Forgot Password',
    },
    {
      path: '/app/blank',
      icon: <DocumentIcon className={submenuIconClasses}/>,
      name: 'Blank Page',
    },
    {
      path: '/app/404',
      icon: <ExclamationTriangleIcon className={submenuIconClasses}/>,
      name: '404',
    },
  ]
}

const feeroutes = {
  path: '', //no url needed as this has submenu
  icon: <CurrencyDollarIcon className={`${iconClasses} inline` }/>, // icon component
  name: 'Fee Management', // name that appear in Sidebar
  submenu : [
    {
      path: '/app/getting-started', // url
      icon: <ExclamationTriangleIcon className={submenuIconClasses}/>,
      name: 'Unpaid Fees', // name that appear in Sidebar
    },
    {
      path: '/app/features',
      icon: <TableCellsIcon className={submenuIconClasses}/>, 
      name: 'Student Fee Manager',
    },
    {
      path: '/app/components',
      icon: <CodeBracketSquareIcon className={submenuIconClasses}/>, 
      name: 'Fee History',
    }
  ]
}

const libraryroutes = {
  path: '', //no url needed as this has submenu
  icon: <TableCellsIcon className={`${iconClasses} inline` }/>, 
  name: 'Library', // name that appear in Sidebar
  submenu : [
    {
      path: '/app/settings-profile', //url
      icon: <UserIcon className={submenuIconClasses}/>, // icon component
      name: 'Borrowings', // name that appear in Sidebar
    },
    {
      path: '/app/settings-billing',
      icon: <WalletIcon className={submenuIconClasses}/>,
      name: 'Late returns',
    },
    {
      path: '/app/settings-team', // url
      icon: <UsersIcon className={submenuIconClasses}/>, // icon component
      name: 'History', // name that appear in Sidebar
    },
  ]
}

const adminroutes = [

  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'Dashboard',
  },
  studentroutes,
  libraryroutes,
  feeroutes,
  {
    path: '/forgot-password',
    icon: <KeyIcon className={submenuIconClasses}/>,
    name: 'Change Password',
  },
  
]



const staffroutes = [

  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'Dashboard',
  },
  feeroutes,
  {
    path: '/forgot-password',
    icon: <KeyIcon className={submenuIconClasses}/>,
    name: 'Change Password',
  },
  
]



const librarianroutes = [

  {
    path: '/app/dashboard',
    icon: <Squares2X2Icon className={iconClasses}/>, 
    name: 'Dashboard',
  },
  libraryroutes,
  {
    path: '/forgot-password',
    icon: <KeyIcon className={submenuIconClasses}/>,
    name: 'Change Password',
  },
  
]




export { adminroutes, librarianroutes, staffroutes}


