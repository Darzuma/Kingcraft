import axios from 'axios'

let http = axios.create({
    baseURL: 'http://localhost:5901/',
    timeout: 6000,
    // headers: {'X-Custom-Header': 'foobar'}
});

export default http