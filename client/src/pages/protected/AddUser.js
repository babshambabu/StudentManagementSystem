import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import AddUser from '../../features/manageUsers/AddUser'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Add Book to Library"}))
      }, [])


    return(
        <AddUser />
    )
}

export default InternalPage