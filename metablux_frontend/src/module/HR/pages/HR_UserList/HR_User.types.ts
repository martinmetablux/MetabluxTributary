export interface HR_UserProps {
    EmployeeList:any
}

export interface EmployeeDetails {
    id:undefined;
    first_name:string;
    last_name:string,
    designation:string;
    department:string;
    username:string;
    password:string;
    confirm_password:string;
}

export interface filterConig {
    search:string;
    active_status:string;
}

export interface EmployeeHeaderProps {
    filterConig?:filterConig;
    setfilterConig:React.Dispatch<React.SetStateAction<filterConig>>
    onOpenEmployeeCreate_Modal: ()=> void
}

export interface HR_EmployeeCreate {
    IsEmployeeCreateModal_open:boolean;
    setIsEmployeeCreateModal_open:React.Dispatch<React.SetStateAction<boolean>>

    EmployeeCreate_FormDate:EmployeeDetails,
    setEmployeeCreate_FormDate:React.Dispatch<React.SetStateAction<EmployeeDetails>>

    IsSaveEmployeeCreate:boolean;
    saveEmployee: (EmployeeCreate_FormDate:EmployeeDetails)=>void;
}