import exceptionAxios from 'axios';
import axios from '../../utils/customAxios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getReviews = createAsyncThunk(
  'reviews/getReviews',
  async (_, { rejectWithValue }) => {
    try {
      const reviews = await exceptionAxios.get('/reviews');
      return reviews.data.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

//TODO: 공부 후 작성
export const addReviews = createAsyncThunk(
  'reviews/addReviews',
  async ({ formData, keyboardId }, { rejectWithValue }) => {
    // const data = {};
    // for (const [key, value] of formData.entries()) {
    //   data[key] = value;
    // }
    // console.log('🤢🤢🤢🤢🤢🤢🤢🤢🤢 client data ', data);
    try {
      await axios.post(`/reviews/${keyboardId}`, formData);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

//TODO: 공부 후 작성
export const updateReviews = createAsyncThunk(
  'reviews/updateReviews',
  async ({ formData, keyboardId }, { rejectWithValue }) => {
    try {
      await axios.patch(`/reviews/${keyboardId}`, formData);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteReviews = createAsyncThunk(
  'reviews/deleteReviews',
  async ({ keyboardId }, { rejectWithValue }) => {
    try {
      await axios.delete(`/reviews/${keyboardId}`);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
