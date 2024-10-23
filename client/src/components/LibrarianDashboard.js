import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../src/components/Cards/TitleCard";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { getLibraryRecords ,updateBorrowStatus} from '../../src/actions/libraryActions.js';
import Modal from 'react-modal'; 
import axiosInstance from "../../src/utils/axiosInstance.js";



const LibrarianDashboard = () => {
  const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [review, setreview] = useState('');

  const ToggleStatus = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true); // Open modal to add review
  };

  const handleSubmitreview = () => {
    dispatch(updateBorrowStatus(selectedRecord._id, review));
    setIsModalOpen(false);
    setreview(''); // Clear review after submission
  };

    const libraryRecordList = useSelector((state) => state.libraryRecordList);
    const { loading, error, libraryRecords } = libraryRecordList;

    useEffect(() => {
        dispatch(getLibraryRecords());
    }, [dispatch]);

    

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
        <div>
          <h1 className="text-3xl font-bold mb-4">Librarian Dashboard</h1>
          
        </div>
            <TitleCard title="Students Book Records" topMargin="mt-2">
                  <div className="overflow-x-auto w-full mt-4">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <table className="table w-full ">
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Book Name</th>
                                    <th>Issue Date</th>
                                    <th>Return Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                    <th>Review</th>
                                </tr>
                            </thead>
                            <tbody>
                            
                                {libraryRecords.map((record) => (
                                    <tr key={record._id}>
                                        <td className="border px-4 py-2">
                <button
                  onClick={() => handleStudentClick(record.studentId._id)}
                  className="text-blue-500 underline"
                >{record.studentId.name} </button>
                                        </td>
                                        <td>{record.bookId.title}</td>
                                        <td>{moment(record.issueDate).format("DD MMM YYYY")}</td>
                                        <td>{moment(record.returnDate).format("DD MMM YYYY")} </td>                                             
                                        <td>{record.status}</td>
                                        <td>{record.status === 'borrowed' && (
                                            <button
                                                onClick={() =>ToggleStatus(record)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                                            >
                                                Update Status
                                            </button>
                                            )}
                                        </td>
                                        <td>{record.review}</td>
                                        
             
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
      <Modal
  isOpen={isModalOpen}
  onRequestClose={() => setIsModalOpen(false)}
  overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
  className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
>
  <h2 className="text-2xl mb-4">Confirm Return and Add Review</h2>
  <p>Are you sure you want to mark this as Returned?</p>
  <label className="block mb-2">write the Review</label>
  <textarea
    className="w-full p-2 border border-gray-300 rounded"
    value={review}
    onChange={(e) => setreview(e.target.value)}
    placeholder="Enter any reviews (optional)"
  />
  <div className="flex justify-end mt-4">
    <button
      className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
      onClick={() => setIsModalOpen(false)}>
      Cancel
    </button>
    <button
      className="bg-blue-500 text-white px-4 py-2 rounded"
      onClick={handleSubmitreview}>
      Mark as Returned
    </button>
  </div>
</Modal>
                </div>
            </TitleCard>
        </>
    );
};

export default LibrarianDashboard;
