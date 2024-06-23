import { createSlice } from "@reduxjs/toolkit"

const addressSlice = createSlice({
    name: "address",
    initialState: {
        fullName: "",
        number: "",
        flat: "",
        area: "",
        landmark: "",
        town: "",
        state: ""
    },
    reducers: {
        addAddress: (state, action) => {
            state.fullName = action.payload.fullName;
            state.number = action.payload.number;
            state.flat = action.payload.flat;
            state.area = action.payload.area;
            state.landmark = action.payload.landmark;
            state.town = action.payload.town;
            state.state = action.payload.state;
        }
    }
});

// exporting reducers and actions
export const { addAddress } = addressSlice.actions;
export default addressSlice.reducer;