import { instance } from '../services/axios'


export const getMenusByUserId = (user_id) => {

    return new Promise( async (resolve, reject) => {
        try {
            const res = await instance.get(`menu/get-by-user/${user_id}`);
            resolve(res)
        } catch (error) {
            console.error(`Error: ${error}`)
            reject(error)
        }
    })
}