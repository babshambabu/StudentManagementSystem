import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import AddBook from '../../features/managelibrary/components/AddBook'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Add Book to Library"}))
      }, [])


    return(
        <AddBook />
    )
}

export default InternalPage