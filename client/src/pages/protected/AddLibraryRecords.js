import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import AddLibraryRecord from '../../features/managelibrary/components/AddLibraryRecords'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Library History"}))
      }, [])


    return(
        <AddLibraryRecord />
    )
}

export default InternalPage