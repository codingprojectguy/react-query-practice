import axios from "axios";

const baseURL = import.meta.env.VITE_STORE_BASE_URL;

const StoreInstance = axios.create({
    baseURL: baseURL,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

export default StoreInstance
