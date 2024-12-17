import { instance } from '../services/axios'


export const login = (username, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await instance.post(`auth/login`,
                {
                    username: username,
                    password: password
                }
            )
            resolve(user.data)
        } catch (error) {            
            reject(error.response.data.error.message)
        }
    })
}