import { useHREmployee } from "./HR_User.hooks";
import { FaEdit } from 'react-icons/fa';
import { MdDeleteForever } from "react-icons/md";
import { MenuList, type MenuOption } from "../../../../components/menu/Menu";

const HR_User: React.FC = () => {
  const HR_Employee = useHREmployee()
  console.log(HR_Employee.EmployeeList)

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
    <>
      <h2><span className="mb-txt-clr-primary mb-mr-5px">Emloyees</span>List</h2>

      {/* <div className="table-container"> */}
        <table className="mb-table">
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
                  <td>{employee.is_active ===true?"True":"False"}</td>
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
      {/* </div> */}



    </>
  );
};

export default HR_User;
