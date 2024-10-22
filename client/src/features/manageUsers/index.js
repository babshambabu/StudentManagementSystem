// components/UserList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listUsers, deleteUser, changePassword } from '../../actions/userActions';

const UserList = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(listUsers());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User List</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="p-4 border">Name</th>
            <th className="p-4 border">Username</th>
            <th className="p-4 border">Role</th>
            <th className="p-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td className="p-4 border">{user.name}</td>
              <td className="p-4 border">{user.username}</td>
              <td className="p-4 border">{user.role}</td>
              <td className="p-4 border">
                <button
                  onClick={() => dispatch(changePassword(user._id, 'new-password'))}
                  className="bg-yellow-500 text-white py-1 px-3 rounded mr-2"
                >
                  Change Password
                </button>
                <button
                  onClick={() => {
                    console.log(user._id)
                    dispatch(deleteUser(user._id))
                    
                  }}
                  className="bg-red-500 text-white py-1 px-3 rounded"
                >
                  Delete User
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
