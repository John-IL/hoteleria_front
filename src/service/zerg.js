import axios from "axios";


const token = localStorage.getItem('accessToken');

export const zergApi = axios.create({
    baseURL: process.env.VUE_APP_API_ZERG_BACK,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
});