import { Employee } from "@/types/Employee";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";



interface EmployeesContextProps {
  loading: boolean;
  employees: Employee[];
  filteredEmployees: Employee[];
  addEmployee: (employee: Employee) => void;
  deleteEmployee: (id: string) => Promise<void>;  // Add this line
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  priorityBased: string;
  setPriorityBased: (term: string) => void;
}

const EmployeesContext = createContext<EmployeesContextProps | undefined>(
  undefined
);

interface EmployeesProviderProps {
  children: ReactNode;
}

export const EmployeesProvider: React.FC<EmployeesProviderProps> = ({
  children,
}) => {
  const [priorityBased, setPriorityBased] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/getAllEmployee");
        const fetchedEmployees = Array.isArray(res.data.employees)
          ? res.data.employees
          : [];
        setEmployees(fetchedEmployees);
        setFilteredEmployees(fetchedEmployees);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setEmployees([]);
        setFilteredEmployees([]);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  useEffect(() => {
    const filterEmployees = () => {
      let filtered = employees.filter(
        (employee) =>
          employee.firstName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          employee.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          employee.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (priorityBased !== "all" && priorityBased) {
        filtered = filtered.filter(
          (employee) => employee.priority === priorityBased
        );
      }
      setFilteredEmployees(filtered);
    };

    filterEmployees();
  }, [searchTerm, employees, priorityBased]);

  const addEmployee = (employee: Employee) => {
    setEmployees((prevEmployees) => [...prevEmployees, employee]);
    setFilteredEmployees((prevFiltered) => [...prevFiltered, employee]);
  };

  const deleteEmployee = async (id: string) => {
    try {
      // Make API call to delete employee
      const res  = await axios.delete(`/api/deleteEmployee?id=${id}`);
      
      console.log("ress",res);
      
      // Update state after successful deletion
      setEmployees((prevEmployees) => 
        prevEmployees.filter(emp => emp._id !== id)
      );
      setFilteredEmployees((prevFiltered) => 
        prevFiltered.filter(emp => emp._id !== id)
      );
    } catch (error) {
      console.error("Error deleting employee:", error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <EmployeesContext.Provider
      value={{
        loading,
        employees,
        filteredEmployees,
        addEmployee,
        deleteEmployee,  // Add this line
        searchTerm,
        setSearchTerm,
        priorityBased,
        setPriorityBased,
      }}
    >
      {children}
    </EmployeesContext.Provider>
  );
};

export const useEmployees = () => {
  const context = useContext(EmployeesContext);
  if (!context) {
    throw new Error("useEmployees must be used within an EmployeesProvider");
  }
  return context;
};