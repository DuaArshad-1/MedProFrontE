// const getLocalhost = () => {
//     const hostUri = Constants.manifest?.hostUri || Constants.expoConfig?.hostUri;
//     return hostUri?.split(':')[0] || 'localhost';
//   };
// export {BASE_URL : 'http://192.168.10.36:3000'};
import axios from 'axios';
const  axiosInstance = axios.create({
    baseURL: 'http://192.168.100.50:3000', // your backend URL here
  });

export default axiosInstance;
