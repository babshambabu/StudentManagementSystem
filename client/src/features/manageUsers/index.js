import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TitleCard from "../../components/Cards/TitleCard"
import ConfirmationModal from "../common/components/ConfirmationModal"
import { useNavigate } from "react-router-dom"
import { listUsers, deleteUser } from '../../actions/userActions';
function UserList(){

    const [showModal, setShowModal] = useState(false);
    const [userToDelete, setuserToDelete] = useState(null);

      const dispatch = useDispatch();
      const { users } = useSelector((state) => state.user);
    
      useEffect(() => {
        dispatch(listUsers());
      }, [dispatch]);


    const navigate=  useNavigate();

    // Open the modal and set the student to be deleted
    const handleDeleteClick = (c_user) => {
    setuserToDelete(c_user);
    setShowModal(true); // Show the modal
    };

    // Confirm delete action and dispatch Redux action
    const handleConfirmDelete = () => {
    if (userToDelete) {
        dispatch(deleteUser(userToDelete.id)); // Dispatch the delete action
        setShowModal(false); 
        setuserToDelete(null); 
    }
    }

    // Cancel deletion and close the modal
    const handleCancelDelete = () => {
    setShowModal(false); 
    setuserToDelete(null); 
    };

console.log(users)
    return(
        <>
            
            <TitleCard title="Current Users" topMargin="mt-2">

                {/* students List in table format loaded from slice after api call */}
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                    <tr>
                    <th className="p-4 border">Name</th>
                    <th className="p-4 border">Username</th>
                    <th className="p-4 border">Role</th>
                    <th className="p-4 border">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((suser, k) => {
                                return(
                                    <tr key={k}>
                                    <td className="p-4 border">
                                        <div className="flex items-center space-x-3">
                                            <div>
                                                <div className="font-bold">{suser.name}</div>
                                                
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-4 border">{suser.username}</td>
                                    <td className="p-4 border">{suser.role}</td>
                                    <td>              <button
                                                        onClick={() => handleDeleteClick(suser)}
                                                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                                                    >
                                                    Delete
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
        studentName={userToDelete ? userToDelete.name : ''}
      />
            </div>
            </TitleCard>
        </>
    )
}


export default UserList