"use client";
import { useState } from "react";
import { EmployeesProvider, useEmployees } from "@/context/EmployeeContext";
import { AddEmployee } from "@/components/AddEmployee";
import { EmployeeList } from "@/components/EmployeeList";

const HomeContent = () => {
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const {
    loading,
    filteredEmployees,
    searchTerm,
    setSearchTerm,
    setPriorityBased,
  } = useEmployees();

  // setting global state here for search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // setting global state here for priority
  const handlePriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPriorityBased(e.target.value);
  };

  return (
    <main className="flex flex-col gap-4">
      <div className="flex gap-4 flex-wrap">

        <button
          onClick={() => setShowAddEmployee(true)}
          className="bg-black px-4 py-2 border-none text-white "
        >
          Add Employee
        </button>

        <input
          type="text"
          placeholder="Search Employee"
          className="bg-gray-100 px-4 py-2 border-none outline-none  flex-grow"
          value={searchTerm}
          onChange={handleSearch}
        />

        <div>
          <label htmlFor="priority">Priority: </label>
          <select
            name="priority"
            id="priority"
            defaultValue={"all"}
            className="bg-gray-100 px-4 py-2 border-none outline-none"
            onChange={handlePriority}
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        
      </div>

      <div>
        <AddEmployee
          showAddEmployee={showAddEmployee}
          setShowAddEmployee={setShowAddEmployee}
        />
      </div>

      <section>
        {loading ? (
          <p>Loading employees...</p>
        ) : (
          <EmployeeList employees={filteredEmployees} />
        )}
      </section>
    </main>
  );
};

export default function Page() {
  return (
    <EmployeesProvider>
      <HomeContent />
    </EmployeesProvider>
  );
}
