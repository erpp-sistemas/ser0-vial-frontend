import { mode } from '../config/credentials'


export const getUrl = () => {
    if(mode === 'dev') {
        return 'http://localhost:3007/api'
    } else {
        return 'https://pulso-democratico.fly.dev/api'
    }
}

