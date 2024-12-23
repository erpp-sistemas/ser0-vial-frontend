import { instance } from '../services/axios'


export const updateById = (data) => {

    return new Promise( async (resolve, reject) => {
        try {
            const res = await instance.put('user/update-by-id', data);
            resolve(res)
        } catch (error) {
            console.error(`Error: ${error}`)
            reject(error)
        }
    })
}