import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../config/axios.api";
import { t } from "i18next";
import toast from "react-hot-toast";
import router from "../../config/router.app";
export const signup = createAsyncThunk(
  'signup/signupUser',
  async ({ email, password, username,navigate }, { rejectWithValue }) => {
    try {
      const response = await api.post('/verify-request', { email, username });
       navigate(router.verfiycode)
      toast.success(t('success.codeSent'));
      return { email, password, username };
    } catch (error) {
      console.log('Signup error:', error.response?.status, error.message);

      if (error.response) {
        const status = error.response.status;

        if (status === 409) {
          return rejectWithValue(t('serverError.usernameExist'));
        } else if (status === 500) {
          return rejectWithValue(t('serverError.error'));
        } else {
          return rejectWithValue(t('serverError.unknownError'));
        }
      } else {
        return rejectWithValue(t('serverError.networkError'));
      }
    }
  }
);

export const verify_code = createAsyncThunk(
  'verify_code/check_code',
  async ({ code }, { rejectWithValue, getState }) => {
    try {
      const { email, password, userType, username } = getState().auth;
      const response = await api.post('/register', {
        email,
        password,
        role: userType,
        username,
        code
      });

      toast.success(t('success.signedUp'));
      return response.data;

    } catch (error) {
      console.log('Verify error:', error.response?.status, error.message);

      if (error.response) {
        const status = error.response.status;

        if (status === 409) {
          return rejectWithValue(t('serverError.usernameExist'));
        } else if (status === 401) {
          return rejectWithValue(t('serverError.noCode'));
        } else if (status === 410) {
          return rejectWithValue(t('serverError.codeExpired'));
        } else {
          return rejectWithValue(t('serverError.error'));
        }
      } else {
        return rejectWithValue(t('serverError.networkError'));
      }
    }
  }
);

export const code_repeat = createAsyncThunk(
  'code_send/code_repeat',
  async (_, { rejectWithValue, getState }) => {
    try {
      const { email, username } = getState().auth;
      const response = await api.post('/verify-request', { email, username });

      toast.success(t('success.codeSent'));
      return response.data;

    } catch (error) {
      console.log('Repeat code error:', error.response?.status, error.message);

      if (error.response) {
        const status = error.response.status;

        if ([400, 409, 500].includes(status)) {
          return rejectWithValue(t('serverError.error'));
        } else {
          return rejectWithValue(t('serverError.unknownError'));
        }
      } else {
        return rejectWithValue(t('serverError.networkError'));
      }
    }
  }
);



const initialState = {
  userType: '',
  email: '',
  username: '',
  password: '',
  reportError: '',
  pending: false,
  success: false,
  success_verify: false,
  pending_verify: false,
  reportError_verify: '',
  repeat_pending: false,
  repeat_success: false,
  repeat_reportError: '',
  repeatedOnce: false
};

const userSignupSlice = createSlice({
  name: 'signupUser',
  initialState,
  reducers: {
    selectType: (state, action) => {
      state.userType = action.payload.type;
    },
    removeAllSignUpExtraData: (state) => {
      state.userType = '';
      state.email = '';
      state.username = '';
      state.password = '';
      state.pending = false;
      state.reportError = '';
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.pending = true;
        state.reportError = '';
        state.success = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.email = action.payload.email;
        state.username = action.payload.username;
        state.password = action.payload.password;
        state.pending = false;
        state.reportError = '';
        state.success = true;
      })
      .addCase(signup.rejected, (state, action) => {
        state.pending = false;
        state.reportError = action.payload;
        state.success = false;
      })

      .addCase(verify_code.pending, (state) => {
        state.reportError_verify = '';
        state.pending_verify = true;
      })
      .addCase(verify_code.fulfilled, (state) => {
        state.pending_verify = false;
        state.success_verify = true;
        state.reportError_verify = '';
      })
      .addCase(verify_code.rejected, (state, action) => {
        state.reportError_verify = action.payload;
        state.pending_verify = false;
        state.success_verify = false;
      })

      .addCase(code_repeat.pending, (state) => {
        state.repeat_pending = true;
        state.repeat_reportError = '';
      })
      .addCase(code_repeat.fulfilled, (state) => {
        state.repeat_pending = false;
        state.repeat_reportError = '';
        state.repeat_success = true;
        state.repeatedOnce = true;
      })
      .addCase(code_repeat.rejected, (state, action) => {
        state.repeat_pending = false;
        state.repeat_success = false;
        state.repeat_reportError = action.payload;
        state.repeatedOnce = true;
      });
  }
});

export const { selectType, removeAllSignUpExtraData } = userSignupSlice.actions;
export default userSignupSlice.reducer;
