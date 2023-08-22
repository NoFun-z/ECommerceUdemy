import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { User } from "../../app/models/user";
import { FieldValues } from "react-hook-form";
import agent from "../../app/api/agent";
import { router } from "../../app/router/Routes";
import { toast } from "react-toastify";
import { setBasket } from "../basket/BasketSlice";

interface AccountState {
    user: User | null;
}

const initialState: AccountState = {
    user: null
}

export const signInUser = createAsyncThunk<User, FieldValues>(
    'account/signInUser',
    async (data, thunkAPI) => {
        try {
            const userDTO = await agent.Account.login(data);
            const {basket, ...user} = userDTO;
            if (basket) thunkAPI.dispatch(setBasket(basket))
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }
        catch (er: any) {
            return thunkAPI.rejectWithValue({ error: er.data })
        }
    }
)

export const fetchCurrentUser = createAsyncThunk<User>(
    'account/fetchCurrentUser',
    async (_, thunkAPI) => {
        thunkAPI.dispatch(setUsers(JSON.parse(localStorage.getItem('user')!)));
        try {
            const userDTO = await agent.Account.currentUser();
            const {basket, ...user} = userDTO;
            if (basket) thunkAPI.dispatch(setBasket(basket))
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        }
        catch (er: any) {
            return thunkAPI.rejectWithValue({ error: er.data })
        }
    },
    {
        condition: () => {
            if (!localStorage.getItem('user')) return false;
        }
    }
)

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        signout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
            router.navigate('/');
        },
        setUsers: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: (builder => {
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            state.user = null;
            localStorage.removeItem('user');
            toast.error('Session expired - please login again');
            router.navigate('/');
        })
        builder.addMatcher(isAnyOf(signInUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {
            state.user = action.payload;
        });
        builder.addMatcher(isAnyOf(signInUser.rejected), (state, action) => {
            throw action.payload;
        });
    })
})

export const {signout, setUsers} = accountSlice.actions;