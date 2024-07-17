import axios from "axios";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useEmployees } from "@/context/EmployeeContext";

interface AddEmployeeProps {
  showAddEmployee: boolean;
  setShowAddEmployee: Dispatch<SetStateAction<boolean>>;
}

export const AddEmployee: React.FC<AddEmployeeProps> = ({
  showAddEmployee,
  setShowAddEmployee,
}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [company, setCompany] = useState("");
  const [priority, setPriority] = useState("low");

  const { addEmployee } = useEmployees();

  const inputAttributes = [
    {
      type: "text",
      placeholder: "First Name",
      value: firstName,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setFirstName(e.target.value),
      required: true,
    },
    {
      type: "text",
      placeholder: "Last Name",
      value: lastName,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setLastName(e.target.value),
      required: true,
    },
    {
      type: "tel",
      placeholder: "Phone Number",
      value: phoneNumber,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setPhoneNumber(e.target.value),
      required: true,
    },
    {
      type: "text",
      placeholder: "Company",
      value: company,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setCompany(e.target.value),
      required: true,
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const employee = {
      firstName,
      lastName,
      phoneNumber,
      company,
      priority,
    };

    try {
      await axios.post("/api/addEmployee", employee);
      addEmployee(employee);
    } catch (error) {
      alert("Error adding employee");
      console.log(error);
    }

    setShowAddEmployee(false);
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setCompany("");
    setPriority("low");
  };

  if (!showAddEmployee) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Add Employee
          </h3>

          {/* add employee form starts here */}
          <form className="mt-2 text-left" onSubmit={handleSubmit}>
            {inputAttributes.map((attr, index) => (
              <div key={index} className="mt-2">
                <input className="p-2 w-full border rounded" {...attr} />
              </div>
            ))}

            <select
              className="mt-2 p-2 w-full border rounded"
              value={priority}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setPriority(e.target.value)
              }
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <div className="items-center px-4 py-3">
              <button
                id="ok-btn"
                className="px-4 py-2 bg-blue-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                type="submit"
              >
                Add Employee
              </button>
            </div>
          </form>
          {/* form ends here */}

          <button
            className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-600"
            onClick={() => setShowAddEmployee(false)}
          >
            {/* close icon svg added from internet */}
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
