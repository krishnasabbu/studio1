/* eslint-disable no-case-declarations */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'Admin' | 'Editor' | 'Viewer';
export type Permission = 'create' | 'read' | 'update' | 'delete';

export interface User {
  id: string;
  username: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  createdAt: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  permissions: Permission[];
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  permissions: [],
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      console.log('🔑 Login action triggered for user:', action.payload);
      state.isAuthenticated = true;
      state.user = action.payload;
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;