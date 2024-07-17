import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import axios from "axios";

interface Employee {
  firstName: string;
  lastName: string;
  company: string;
  phoneNumber: string;
  priority: string;
}

interface EmployeesContextProps {
  loading: boolean;
  employees: Employee[];
  filteredEmployees: Employee[];
  addEmployee: (employee: Employee) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  priorityBased: string;
  setPriorityBased: (term: string) => void;
}

const EmployeesContext = createContext<EmployeesContextProps | undefined>(undefined);

interface EmployeesProviderProps {
  children: ReactNode;
}

export const EmployeesProvider: React.FC<EmployeesProviderProps> = ({ children }) => {
  const [priorityBased, setPriorityBased] = useState<string>(""); // Initialize with string type
  const [loading, setLoading] = useState<boolean>(true); // Initialize with boolean type
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [filteredEmployees, setFilteredEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/api/getAllEmployee");
        const fetchedEmployees = Array.isArray(res.data.employees) ? res.data.employees : [];
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
      let filtered = employees.filter((employee) =>
        employee.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (priorityBased !== "all" && priorityBased ) {
        filtered = filtered.filter((employee) => employee.priority === priorityBased);
      }
      setFilteredEmployees(filtered);
    };

    filterEmployees();
  }, [searchTerm, employees, priorityBased]);

  const addEmployee = (employee: Employee) => {
    setEmployees((prevEmployees) => [...prevEmployees, employee]);
    setFilteredEmployees((prevFiltered) => [...prevFiltered, employee]);
  };

  return (
    <EmployeesContext.Provider
      value={{ loading, employees, filteredEmployees, addEmployee, searchTerm, setSearchTerm, priorityBased, setPriorityBased }}
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
