import { useHREmployee } from "./HR_User.hooks";
import { EmloyeesCreateModal, EmployeeHeader, EmployeeList } from "./HR_User.Container";

const HR_User: React.FC = () => {
  const HR_Employee = useHREmployee()
  console.log(HR_Employee.EmployeeList)

  
  return (
    <>
      <h2><span className="mb-txt-clr-primary mb-mr-5px">Emloyees</span>List</h2>

      <EmployeeHeader 
        setfilterConig={HR_Employee.setfilterConig}
        onOpenEmployeeCreate_Modal={()=>HR_Employee.setIsEmployeeCreateModal_open(true)} 
      />

      <EmployeeList EmployeeList={HR_Employee.EmployeeList} />

      <EmloyeesCreateModal 
        IsEmployeeCreateModal_open={HR_Employee.IsEmployeeCreateModal_open} 
        setIsEmployeeCreateModal_open={HR_Employee.setIsEmployeeCreateModal_open}
        EmployeeCreate_FormDate={HR_Employee.EmployeeCreate_FormDate}
        setEmployeeCreate_FormDate={HR_Employee.setEmployeeCreate_FormDate}
        saveEmployee={HR_Employee.saveEmployee}
        IsSaveEmployeeCreate={HR_Employee.IsSaveEmployeeCreate}
      />

    </>
  );
};

export default HR_User;
