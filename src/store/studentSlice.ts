import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Student {
  id: string;
  student_code: string;
  first_name: string;
  last_name: string;
  email: string;
  dob: string;
  gender: string;
  phone: string;
  address: string;
}

interface StudentState {
  students: Student[];
}

const initialState: StudentState = {
  students: [],
};

const studentSlice = createSlice({
  name: 'students',
  initialState,
  reducers: {
    setStudents: (state, action: PayloadAction<Student[]>) => {
      state.students = action.payload;
    },
  },
});

export const { setStudents } = studentSlice.actions;
export default studentSlice.reducer;
