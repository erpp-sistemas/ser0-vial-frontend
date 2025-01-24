import { instance } from '../services/axios';


export const getServicesByPlace = (place_id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const res = await instance.get(`service-map/get-by-place/${place_id}`);
            resolve(res.data)
        } catch (error) {
            console.error(`Error: ${error}`)
            reject(error)
        }
    })
}

export const getLayersByPlace = (place_id) => {
    return new Promise( async (resolve, reject) => {
        try {
            const res = await instance.get(`layer/get-by-place/${place_id}`);
            resolve(res.data)
        } catch (error) {
            console.error(`Error: ${error}`)
            reject(error)
        }
    })
}