import axios from "axios";
import {jwtDecode} from 'jwt-decode'
export const createAxios = (user,dispatch,stateSuccess) =>{
    const newInstance = axios.create({})
    newInstance.interceptors.request.use(async(config)=> {
        let date = new Date()
        const decodedToken = jwtDecode(user?.accessToken)
        // console.log(decodedToken)
        if(decodedToken.exp< date.getTime()/1000){
            const data = await refreshToken()
            const refreshUser = {
                ...user,
                accessToken:data.accessToken
            }
            dispatch(stateSuccess(refreshUser))
            config.headers["authorization"] = "Bearer " + data.accessToken
        }
        return config;
      }, function (error) {
        return Promise.reject(error);
      });
      return newInstance;
}

const refreshToken=async()=>{
    try {
        const res =  await axios.post('http://localhost:7000/api/auth/refresh',{
            withCredentials:true
        })
        return res.data
    } catch (error) {
        console.log(error)
        throw error
    }
}
