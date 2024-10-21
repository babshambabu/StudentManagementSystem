import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import OverdueRecords from '../../features/managelibrary/OverdueRecords'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Overdue History"}))
      }, [])


    return(
        <OverdueRecords />
    )
}

export default InternalPage