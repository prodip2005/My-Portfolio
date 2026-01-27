import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://portfolio-backend-amber-nu.vercel.app'
});

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;