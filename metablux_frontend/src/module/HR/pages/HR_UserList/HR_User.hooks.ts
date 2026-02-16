import { useEffect, useState } from "react"
import { Get_HREmployeeListAPI } from "./HR_User.api";

export function useHREmployee(){
    const [EmployeeList,setEmployeeList]=useState<any>([])

    useEffect(()=>{
        const getHR_EmployeeList = async () => {
            try {
                const response = await Get_HREmployeeListAPI();
                setEmployeeList(response)
            } catch (error) {
                console.error("Failed to fetch vertical list", error);
                setEmployeeList([])
            } 
        };
        getHR_EmployeeList();
    },[])

    return{
        EmployeeList
    }
}