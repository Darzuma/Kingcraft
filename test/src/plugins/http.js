import axios from 'axios'

let http = axios.create({
    baseURL: __ENV.baseURL, // process.env.baseURL 的值在 vite.config.js 中定义
    timeout: 6000,
    // withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 'Access-Control-Allow-Origin': '*'
    }
});

export default http