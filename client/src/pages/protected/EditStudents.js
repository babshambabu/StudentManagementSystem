import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../../features/common/headerSlice'
import EditStudents from '../../features/manageStudents/components/EditStudent'
import { useParams } from "react-router-dom";
function InternalPage(studentId){
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setPageTitle({ title : "Edit Students"}))
      }, [])


const params = useParams();
    


    return(
        <EditStudents studentId={params["*"]} />
    )
}

export default InternalPage