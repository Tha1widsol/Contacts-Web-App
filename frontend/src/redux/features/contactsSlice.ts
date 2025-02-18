import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios, {AxiosError} from "axios"

export type ContactProps = {
    id?: number;
    first_name: string,
    surname: string,
    email: string,
    phone: string,
    mobile?: string
  };
  
interface ContactState {
    values: ContactProps[]
    status: string
}

const initialState = {
    status: "",
    values: []
} as ContactState

export const fetchContacts = createAsyncThunk(
    "contacts/fetchContacts",
     async (_, {rejectWithValue}) => {
       try {
            const response = await axios.get("/api/contacts")
            return response.data
        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>;
            return rejectWithValue(
              axiosError.response?.data?.message || axiosError.message || "Unknown error"
            );
         }
  }
)

export const addContact = createAsyncThunk(
    "contacts/addContact",
     async (contact: ContactProps, {rejectWithValue}) => {
       try {
            const response = await axios.post(`/api/contacts`, contact)
            return response.data
        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>;
            return rejectWithValue(
              axiosError.response?.data?.message || axiosError.message || "Unknown error"
            );
         }
  }
)

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
     async (contactId: number, {rejectWithValue}) => {
       try {
            const response = await axios.delete(`/api/contacts/${contactId}`)
            return {...response.data, id: contactId}
        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>;
            return rejectWithValue(
              axiosError.response?.data?.message || axiosError.message || "Unknown error"
            );
         }
  }
)

export const editContact = createAsyncThunk(
    "contacts/editContact",
     async (contact: ContactProps, {rejectWithValue}) => {
       try {
            const response = await axios.put(`/api/contacts/${contact.id}`, contact)
            return response.data
        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>;
            return rejectWithValue(
              axiosError.response?.data?.message || axiosError.message || "Unknown error"
            );
         }
  }
)


export const contactsSlice = createSlice({
    name : "contacts",
    initialState,
    reducers: {},

    extraReducers(builder){
        builder
            .addCase(fetchContacts.pending, (state) => {
                state.status = "loading"
            })

            .addCase(fetchContacts.fulfilled, (state, action) => {
                state.status = "success"
                state.values = action.payload
            })

            .addCase(fetchContacts.rejected, (state) => {
                state.status = "rejected"
            })

        builder
            .addCase(addContact.pending, (state) => {
                state.status = "loading"
            })

            .addCase(addContact.fulfilled, (state, action) => {
                state.status = "success"
                state.values?.push(action.payload)
            })

            .addCase(addContact.rejected, (state) => {
                state.status = "rejected"
            })

        builder
            .addCase(deleteContact.pending, (state) => {
                state.status = "loading"
            })

            .addCase(deleteContact.fulfilled, (state, action) => {
                state.status = "success"
                const {id} = action.payload
                const index = state.values.findIndex(contact => contact.id === id)
                state.values.splice(index, 1)
            })

            .addCase(deleteContact.rejected, (state) => {
                state.status = "rejected"
            })

        builder
            .addCase(editContact.pending, (state) => {
                state.status = "loading"
            })

            .addCase(editContact.fulfilled, (state, action) => {
                state.status = "success";
                const { id } = action.payload;
            
                const index = state.values.findIndex(contact => contact.id === id);
                
                if (index !== -1) {
                    state.values = [
                        ...state.values.slice(0, index),
                        action.payload,
                        ...state.values.slice(index + 1),
                    ];
                }
            })
            

            .addCase(editContact.rejected, (state) => {
                state.status = "rejected"
            })
    }


})

export default contactsSlice.reducer;