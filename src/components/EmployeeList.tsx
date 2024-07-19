interface Employee {
  _id:string,
  firstName: string;
  lastName: string;
  company: string;
  phoneNumber: string;
  priority: string;
}


// props types [ts]
interface EmployeeListProps {
  employees: Employee[] | null;
  onDeleteEmployee: (id: string) => void;
}

export const EmployeeList: React.FC<EmployeeListProps> = ({ employees, onDeleteEmployee }) => {
  if (!employees || employees.length === 0) {
    return <p>No employees found.</p>;
  }
  console.log(employees);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Our Team
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {employees.map((emp) => (
          <div
            key={emp._id}
            className="bg-white rounded-md shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 p-2 relative"
          >
            <button
              onClick={() => onDeleteEmployee(emp._id)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 transition-colors duration-300"
              aria-label="Delete employee"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                ></path>
              </svg>
            </button>
            
            <div className="p-6">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-gray-800">
                {emp.firstName} {emp.lastName}
              </h3>
              <p className="text-gray-600 mb-4">{emp.company}</p>
              <div className="flex items-center mb-2">
                <svg
                  className="w-5 h-5 text-gray-500 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                <span className="text-gray-700">{emp.phoneNumber}</span>
              </div>
            </div>  
            </div>
            <span
              className={`text-sm font-semibold ${getPriorityColor(
                emp.priority
              )}`}
            >
              {emp.priority.charAt(0).toUpperCase() + emp.priority.slice(1)}{" "}
              Priority
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// priority function
function getPriorityColor(priority:string) {
  switch (priority.toLowerCase()) {
    case "high":
      return "text-red-600";
    case "medium":
      return "text-yellow-600";
    case "low":
      return "text-green-600";
    default:
      return "text-gray-600";
  }
}
