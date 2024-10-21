import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice.js'
import UnpaidFees from '../../features/managefees/UnpaidFees.js'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Unpaid Fee records"}))
      }, [])


    return(
        <UnpaidFees />
    )
}

export default InternalPage