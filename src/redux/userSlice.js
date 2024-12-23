import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user_id: 0,
  username: "",
  password: "",
  first_name: "",
  middle_name: "",
  paternal_surname: "",
  maternal_surname: "",
  birthdate: "",
  photo_url: "",
  entry_date: "",
  low_date: "",
  active: 0,
  access_web: 0,
  access_movil: 0,
  role_id: 0,
  theme_color: "#2196F3"
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const {
        user_id,
        username,
        password,
        first_name,
        middle_name,
        paternal_surname,
        maternal_surname,
        birthdate,
        photo_url,
        entry_date,
        low_date,
        active,
        access_web,
        access_movil,
        role_id,
        theme_color,
      } = action.payload;
      state.user_id = user_id,
      state.username = username,
      state.password = password,
      state.first_name = first_name,
      state.middle_name = middle_name,
      state.paternal_surname = paternal_surname,
      state.maternal_surname = maternal_surname,
      state.birthdate = birthdate,
      state.photo_url = photo_url,
      state.entry_date = entry_date,
      state.low_date = low_date,
      state.active = active,
      state.access_web = access_web,
      state.access_movil = access_movil,
      state.role_id = role_id,
      state.theme_color = theme_color;
    },
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value; // Actualiza dinámicamente el campo
    },
  },
});

export const { setUser, updateField } = userSlice.actions;
export default userSlice.reducer;
