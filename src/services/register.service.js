import { instance } from "../services/axios";

export const getByDates = (place_id, form_id, date_init, date_end) => {
  return new Promise(async (resolve, reject) => {
    try {
      const register = await instance.post(`register/get-by-dates`, {
        place_id: place_id,
        form_id: form_id,
        date_init: date_init,
        date_end: date_end
      });
      resolve(register.data);
    } catch (error) {
      reject(error.response.data.error.message);
    }
  });
};
