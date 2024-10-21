import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import Students from '../../features/manageStudents'
import AddStudent from '../../features/manageStudents/components/AddStudent'
function InternalPage(){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Students"}))
      }, [])


    return(
        <AddStudent/>
    )
}

export default InternalPage