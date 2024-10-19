import React, { useState } from 'react';
import AddBookForm from "../../components/Forms/AddBookForm ";

const LibraryApp = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  
    return (
      <div className="p-8">
        <button
          onClick={openModal}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Add Book
        </button>
  
        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <button
                onClick={closeModal}
                className="text-red-500 float-right mb-4"
              >
                x
              </button>
              <AddBookForm onClose={closeModal} />
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default LibraryApp;