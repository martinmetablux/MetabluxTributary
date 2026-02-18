import { useEffect, useState } from "react"
import { Get_HREmployeeListAPI } from "./HR_User.api";
import type { EmployeeDetails, filterConig } from "./HR_User.types";

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

    // Create EMployee
    const EmployeeCreate_init:EmployeeDetails={
         id:undefined,
        first_name:"",
        last_name:"",
        designation:"",
        department:"",
        username:"",
        password:"",
        confirm_password:"",
    }
    const [IsEmployeeCreateModal_open,setIsEmployeeCreateModal_open]=useState(false)
    const [IsSaveEmployeeCreate,setIsSaveEmployeeCreate]=useState(false)
    const [EmployeeCreate_FormDate,setEmployeeCreate_FormDate]=useState<EmployeeDetails>(EmployeeCreate_init)

    const saveEmployee = async (EmployeeData:EmployeeDetails)=>{
        setIsSaveEmployeeCreate(true)
        console.log("Inside of create : ",EmployeeData)
    }

    // Filter EMployee
    const filterConig_init:filterConig={
        search:"",
        active_status:""
    }
    const [filterConig,setfilterConig]=useState<filterConig>(filterConig_init)

    return{
        EmployeeList,

        // Filter Emloyee
        filterConig,setfilterConig,

        // Create Employee
        saveEmployee,IsSaveEmployeeCreate,
        EmployeeCreate_FormDate,setEmployeeCreate_FormDate,
        IsEmployeeCreateModal_open,setIsEmployeeCreateModal_open
    }
}