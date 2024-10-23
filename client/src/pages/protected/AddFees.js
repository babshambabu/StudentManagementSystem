import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import AddFees from '../../features/managefees/AddFees.js'

function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Add Fee Form"}))
      }, [])


    return(
        <AddFees />
    )
}

export default InternalPage