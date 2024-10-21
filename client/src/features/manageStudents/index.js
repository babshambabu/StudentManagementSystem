import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import TrashIcon from '@heroicons/react/24/outline/TrashIcon'
import { fetchStudents, deleteStudent } from "../../actions/studentActions"
import ConfirmationModal from "../common/components/ConfirmationModal"
import { useNavigate } from "react-router-dom"
function Students(){

    const [showModal, setShowModal] = useState(false);
    const [studentToDelete, setStudentToDelete] = useState(null);

    const dispatch = useDispatch();
    const { students } = useSelector((state) => state.students);
   
    useEffect(() => {
      dispatch(fetchStudents());
    }, [dispatch]);
  
    const navigate=  useNavigate();

    // Open the modal and set the student to be deleted
    const handleDeleteClick = (student) => {
    setStudentToDelete(student);
    setShowModal(true); // Show the modal
    };

    // Confirm delete action and dispatch Redux action
    const handleConfirmDelete = () => {
    if (studentToDelete) {
        dispatch(deleteStudent(studentToDelete._id)); // Dispatch the delete action
        setShowModal(false); // Close the modal after deletion
        setStudentToDelete(null); // Clear the state
    }
    }

    // Cancel deletion and close the modal
    const handleCancelDelete = () => {
    setShowModal(false); // Close the modal without deletion
    setStudentToDelete(null); // Clear the state
    };

    const goEdit = (std) => {
        navigate("/app/editstudents/"+std._id)
    }

    console.log(students)

    return(
        <>
            
            <TitleCard title="Current students" topMargin="mt-2">

                {/* students List in table format loaded from slice after api call */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email Id</th>
                        <th>Class</th>
                        <th>Admission Number</th>
                        <th>Age</th>
                        <th>Address</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            students.map((student, k) => {
                                return(
                                    <tr key={k}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div>
                                                <div className="font-bold">{student.name}</div>
                                                
                                            </div>
                                        </div>
                                    </td>
                                    <td>{student.email}</td>
                                    <td>{student.class+" "+student.division}{/*/ moment(new Date()).add(-5*(k+2), 'days').format("DD MMM YY") /*/}</td>
                                    <td>{student.studentId}</td>
                                    <td>{student.age}</td>
                                    <td>{student.address}</td>
                                    <td>              <button
                                                        onClick={() => handleDeleteClick(student)}
                                                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                                    >
                                                    Delete
                                                  </button>
                                                  </td>
                                                  <td>
                                                  <button onClick={()=>goEdit(student)}
                                                   className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-red-600" >
                                                   Edit
                                                  </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>

                <ConfirmationModal
        show={showModal}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        studentName={studentToDelete ? studentToDelete.name : ''}
      />
            </div>
            </TitleCard>
        </>
    )
}


export default Students