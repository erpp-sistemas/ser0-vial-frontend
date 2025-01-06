import { instance } from '../services/axios'


export const getFormAll = () => {

    return new Promise( async (resolve, reject) => {
        try {
            const res = await instance.get(`form/get-all`);
            resolve(res)
        } catch (error) {
            console.error(`Error: ${error}`)
            reject(error)
        }
    })
}