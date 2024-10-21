import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import FeeHistory from '../../features/managefees'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Fee History"}))
      }, [])


    return(
        <FeeHistory />
    )
}

export default InternalPage