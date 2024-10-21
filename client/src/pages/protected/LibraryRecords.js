import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import LibraryHistory from '../../features/managelibrary'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Library History"}))
      }, [])


    return(
        <LibraryHistory />
    )
}

export default InternalPage