import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'



export const getstudentsContent = createAsyncThunk('/students/content', async () => {
	const response = await axios.get('/api/users?page=2', {})
	return response.data;
})

export const studentsSlice = createSlice({
    name: 'students',
    initialState: {
        isLoading: false,
        students : []
    },
    reducers: {


        addNewstudents: (state, action) => {
            let {newstudentsObj} = action.payload
            state.students = [...state.students, newstudentsObj]
        },

        deletestudents: (state, action) => {
            let {index} = action.payload
            state.students.splice(index, 1)
        }
    },

    extraReducers: {
		[getstudentsContent.pending]: state => {
			state.isLoading = true
		},
		[getstudentsContent.fulfilled]: (state, action) => {
			state.students = action.payload.data
			state.isLoading = false
		},
		[getstudentsContent.rejected]: state => {
			state.isLoading = false
		},
    }
})

export const { addNewstudents, deletestudents } = studentsSlice.actions

export default studentsSlice.reducer