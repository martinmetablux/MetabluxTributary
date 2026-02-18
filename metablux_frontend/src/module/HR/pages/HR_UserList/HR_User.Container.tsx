import type { EmployeeHeaderProps, HR_EmployeeCreate, HR_UserProps } from "./HR_User.types";
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from "react-icons/md";
import { MenuList, type MenuOption } from "../../../../components/menu/Menu";
import { Badge } from "../../../../components/badge/badge";
import { MB_Modal } from "../../../../components/modal/MB_modal";
import type React from "react";


// Employee Header
export const EmployeeHeader:React.FC<EmployeeHeaderProps>=(EmployeeHeaderProps)=>{
  return (
    <>
        <div className="mb-flex-x-between-y-center-wrap">
          <div>
            <input className="mb-input" type="search" name="" placeholder="Search User" />
            <button className="mb-btn mb-btn-secondary mb-ml-5px">Filter</button>
          </div>
          <div>
            <button className="mb-btn mb-btn-secondary">Excel Upload</button>
            <button className="mb-btn mb-btn-primary mb-ml-5px" onClick={EmployeeHeaderProps.onOpenEmployeeCreate_Modal}>Create Employee</button>
          </div>
        </div>
    </>
  )
}

// Exployee List
export const EmployeeList: React.FC<HR_UserProps> = (HR_Employee) => {
    const menuOptions = (employee: any): MenuOption[] => {
      const options: MenuOption[] = [];

        options.push({
          label: "Edit",
          onClick: () => {console.log("employee : ",employee)},
          svgicon: <FaEdit />
        });

        options.push({
          label: "Delete",
          onClick: () => {},
          danger: true,
          svgicon: <MdDeleteForever />
        });

      
      return options;
    };
  return (
    <div>
      <table className="mb-table mb-mt-5px">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Role</th>
              <th>Active</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {HR_Employee.EmployeeList.length > 0 &&
              HR_Employee.EmployeeList.map((employee: any,index:any) => (
                <tr>
                  <td>{index+1}</td>
                  <td>{employee.username}</td>
                  <td>{employee.first_name}</td>
                  <td>{employee.last_name}</td>
                  <td>-</td>
                  <td>{employee.is_active ===true?<Badge title="Active" bg_clr="#00800054" clr="green" />:<Badge title="Deactive" bg_clr="#80000029" clr="red" />}</td>
                  <td onClick={(e) => e.stopPropagation()}>
                    <MenuList options={menuOptions(employee as any)}>
                      <span>⋮</span>
                    </MenuList>
                  </td> 
                </tr>
              ))
            }
          </tbody>
        </table>
    </div>
  );
};


// Employee Create Modal
export const EmloyeesCreateModal:React.FC<HR_EmployeeCreate>=(EmployeeCreate)=>{
  return (
      <MB_Modal
        open={EmployeeCreate.IsEmployeeCreateModal_open}
        onClose={() => EmployeeCreate.setIsEmployeeCreateModal_open(false)}
        title="Add New Employee"
        size="md"
        footer={
            <>
            <button className="mb-btn mb-btn-secondary" onClick={() => EmployeeCreate.setIsEmployeeCreateModal_open(false)}>
                Close
            </button>
            <button className="mb-btn mb-btn-primary">Save</button>
            </>
        }
        >
        {/* Your form inputs here */}
        <div>
            <h3>Add Employee Form Data</h3>
        </div>
    </MB_Modal>
  )
}