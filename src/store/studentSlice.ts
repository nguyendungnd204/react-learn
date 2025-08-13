import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { StudentList } from '../types/studentList';


interface StudentState {
  students: StudentList[];
}

const initialState: StudentState = {
  students: [],
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudents: (state, action: PayloadAction<StudentList[]>) => {
      state.students = action.payload;
    },
    addStudent: (state, action: PayloadAction<StudentList>) => {
      state.students.push(action.payload);
    },
    updateStudent: (state, action: PayloadAction<StudentList>) => {
      const index = state.students.findIndex(student => student.id === action.payload.id);
      if (index !== -1) {
        state.students[index] = action.payload;
      }
    },
    removeStudent: (state, action: PayloadAction<string>) => {
      state.students = state.students.filter(student => student.id !== action.payload);
    },
  },
});

export const { setStudents, addStudent, updateStudent, removeStudent } = studentSlice.actions;
export default studentSlice.reducer;
