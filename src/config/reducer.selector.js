import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
 export const useSelect=(key)=>{
    const data=useSelector(state=>state[key])
    return data



}

export const useAppdispatch=()=>useDispatch()

