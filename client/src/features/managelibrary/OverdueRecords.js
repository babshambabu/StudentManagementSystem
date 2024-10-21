import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TitleCard from "../../components/Cards/TitleCard";
import { useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { getLibraryRecords } from '../../actions/libraryActions.js';

function OverdueRecords() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const libraryRecordList = useSelector((state) => state.libraryRecordList);
    const { loading, error, libraryRecords } = libraryRecordList;

    useEffect(() => {
        dispatch(getLibraryRecords());
    }, [dispatch]);

   
    // Get today's date
    const today = moment().startOf('day');

    // Filter for overdue records
    const overdueRecords = libraryRecords.filter(record => 
        record.status === 'borrowed' 
    );

    return (
        <>
            <TitleCard title="Overdue Library Records" topMargin="mt-2">
                <div className="overflow-x-auto w-full mt-4">
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>{error}</p>
                    ) : (
                        <table className="table w-full">
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Book Name</th>
                                    <th>Issue Date</th>
                                    <th>Return Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {overdueRecords.length > 0 ? (
                                    overdueRecords.map((record) => (
                                        <tr key={record._id}>
                                            <td>{record.studentId.name}</td>
                                            <td>{record.bookId.title}</td>
                                            <td>{moment(record.issueDate).format("DD MMM YYYY")}</td>
                                            <td>{moment(record.returnDate).format("DD MMM YYYY")}</td>
                                            <td>{record.status}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="text-center">
                                            No overdue records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </TitleCard>
        </>
    );
}

export default OverdueRecords;
