import axios from 'axios'

export default axios.create({
    baseURL: 'https://warrioroflegends/api/',
    timeout: 6000,
    // headers: {'X-Custom-Header': 'foobar'}
});