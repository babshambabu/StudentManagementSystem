import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { getLibraryRecords } from '../../actions/libraryActions.js';
import Modal from 'react-modal'; 
import axiosInstance from "../../utils/axiosInstance.js";



function LibraryHistory() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

    const libraryRecordList = useSelector((state) => state.libraryRecordList);
    const { loading, error, libraryRecords } = libraryRecordList;

    useEffect(() => {
        dispatch(getLibraryRecords());
    }, [dispatch]);

    const goUpdate = (record) => {
        navigate("/updateLibrary/" + record._id);
    };

    const navigateToAddRecord = () => {
        navigate('/app/borrowbooks');
    };
    const handleStudentClick = async (studentId) => {
        console.log(studentId)
        try {
          const response = await axiosInstance.get(`/students/${studentId}`);
          setSelectedStudent(response.data);
          setIsStudentModalOpen(true);
        } catch (error) {
          console.error("Error fetching student details:", error);
        }
      };
    
      const closeStudentModal = () => {
        setIsStudentModalOpen(false);
        setSelectedStudent(null);
      };
    

    return (
        <>
            <TitleCard title="Library Records" topMargin="mt-2">
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    onClick={navigateToAddRecord}
                >
                    Add Library Record
                </button>

                <div className="overflow-x-auto w-full mt-4">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <table className="table w-full  border-none">
                            <thead>
                                <tr className="text-black-500">
                                    <th>Student Name</th>
                                    <th>Book Name</th>
                                    <th>Issue Date</th>
                                    <th>Return Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                                {libraryRecords.map((record) => (
                                    <tr key={record._id}>
                                        <td className="border px-4 py-2">
                <button
                  onClick={() => handleStudentClick(record.studentId._id)}
                  className="text-blue-500 border-none "
                >{record.studentId.name} </button>
                                        </td>
                                        <td>{record.bookId.title}</td>
                                        <td>{moment(record.issueDate).format("DD MMM YYYY")}</td>
                                        <td>{moment(record.returnDate).format("DD MMM YYYY")} </td>                                             
                                        <td>{record.status}</td>
                                        <td>
                                            <button
                                                onClick={() => goUpdate(record)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                            >
                                                Update
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    {/* Modal for showing student details */}
<Modal
        isOpen={isStudentModalOpen}
        onRequestClose={closeStudentModal}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        {selectedStudent && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Student Details</h2>
            <p><strong>Name:</strong> {selectedStudent.name}</p>
            <p><strong>Admission Number:</strong> {selectedStudent.studentId}</p>
            <p><strong>Email:</strong> {selectedStudent.email}</p>
            <p><strong>Class </strong> {selectedStudent.class} - {selectedStudent.division}</p>
            <p><strong>Age:</strong> {selectedStudent.age || 'N/A'}</p>
            <p><strong>Address:</strong> {selectedStudent.address || 'N/A'}</p>
            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={closeStudentModal}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
                </div>
            </TitleCard>
        </>
    );
}

export default LibraryHistory;
