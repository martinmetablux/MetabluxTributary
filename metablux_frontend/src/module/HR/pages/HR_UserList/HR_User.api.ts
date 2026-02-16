import axios from "../../../../api/axiosConig";

// ===((( HR Employee List API )))
export const Get_HREmployeeListAPI = async () => {
    const EmployeeList = await axios.get('hr/employee/list',{ withCredentials: true})
    return EmployeeList.data.data
};
