import axios from "axios";

 const axios=axios.create({
    baseURL:'http://localhost:1747/api',
    withCredentials:true,
    headers:{
         'Content-Type': 'application/json'
    }
 })

 export default axios