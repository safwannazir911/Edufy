import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dummyAttendanceData from './dummyAttendanceData ';
export const Attendance = () => {
  const username = localStorage.getItem("username");
  const role = "teacher";

  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [presentStudents, setPresentStudents] = useState([]);
  const [studentsList, setStudentsList] = useState([
    { "id": 1, "name": "John Doe", "course": "Math101" },
    { "id": 2, "name": "Jane Smith", "course": "Math101" },
    { "id": 3, "name": "Bob Johnson", "course": "Math101" },
    { "id": 4, "name": "Alice Brown", "course": "Physics101" },
    { "id": 5, "name": "Charlie Wilson", "course": "Physics101" },
    { "id": 6, "name": "Eva Davis", "course": "Physics101" }
  ]);
  const [attendanceData, setAttendanceData] = useState(dummyAttendanceData);
  const [selectedMonths, setSelectedMonths] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const takeAttendance = async () => {
    if (!selectedCourse || !selectedDate) {
      console.error('Please select a course and date.');
      return;
    }

    const newAttendanceEntry = {
      courseId: selectedCourse,
      date: selectedDate,
      presentStudents: presentStudents,
    };

    try {
      setLoading(true);

      // Example POST request to save attendance
      await axios.post('http://example.com/save-attendance', newAttendanceEntry);

      // Reset the state after taking attendance
      setSelectedCourse('');
      setSelectedDate('');
      setPresentStudents([]);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError("Error saving attendance data.");
    }
  };

  const viewAttendance = async () => {
    if (!selectedCourse || selectedMonths.length === 0) {
      setError('Please select at least one month.');
      return;
    }

    try {
      setLoading(true);

      // Example GET request to fetch attendance records for the selected course and months
      const response = await axios.get(`http://example.com/attendance/${selectedCourse}`, {
        params: {
          months: selectedMonths.join(','), // Send selected months as a comma-separated string
        },
      });

      // Update the state with the fetched attendance data
      setAttendanceData(response.data);
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError("Error fetching attendance data.");
    }
  };

  const fetchStudents = async () => {
    if (selectedCourse) {
      try {
        setLoading(true);

        // Example GET request to fetch students for the selected course
        const response = await axios.get(`http://example.com/students/${selectedCourse}`);

        setStudentsList(response.data);
        setLoading(false);
        setError(null);
      } catch (error) {
        setLoading(false);
        setError("Error fetching students for the selected course.");
      }
    }
  };

  useEffect(() => {
    if (selectedCourse && role === "teacher") {
      fetchStudents();
    }
  }, [selectedCourse]);

  // Function to generate a list of months that have elapsed until the current month
  const getElapsedMonths = () => {
    const currentMonth = new Date().getMonth();
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    return months.slice(0, currentMonth + 1);
  };

  // Handle checkbox changes for months
  const handleMonthCheckbox = (month) => {
    if (selectedMonths.includes(month)) {
      // If already selected, remove it
      setSelectedMonths(selectedMonths.filter((selectedMonth) => selectedMonth !== month));
    } else {
      // If not selected, add it
      setSelectedMonths([...selectedMonths, month]);
    }
  };

  const calculateAttendancePercentage = (month) => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];

    const totalEntries = attendanceData.filter((entry) => {
      const entryMonth = new Date(entry.date).getMonth();
      return monthNames[entryMonth] === month;
    }).length;

    const presentEntries = attendanceData.filter((entry) => {
      const entryMonth = new Date(entry.date).getMonth();
      return monthNames[entryMonth] === month && entry.status === 'Present';
    }).length;

    return totalEntries === 0 ? 0 : (presentEntries / totalEntries) * 100;
  };

  const calculateTotalAttendance = () => {
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];

    const totalEntries = attendanceData.filter((entry) => {
      const entryMonth = new Date(entry.date).getMonth();
      return selectedMonths.includes(monthNames[entryMonth]);
    }).length;
    const presentEntries = attendanceData.filter((entry) => {
      const entryMonth = new Date(entry.date).getMonth();
      return selectedMonths.includes(monthNames[entryMonth]) && entry.status === 'Present';
    }).length;

    return totalEntries === 0 ? 0 : (presentEntries / totalEntries) * 100;
  };



  return (
    <div className='m-4'>
      <h2 className="mb-4">Attendance</h2>
      <div>
        <div>
          <h1 className="mb-3">Welcome, {username && username.split('@')[0]}!</h1>
          <p>Role: {role}</p>
        </div>
        {role === 'teacher' && (
          <div>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="form-select mb-3"
            >
              <option value="">Select Course</option>
              <option value="Math101">Math</option>
              <option value="Physics101">Physics</option>
            </select>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                const currentDate = new Date();
                const selectedDateObj = new Date(e.target.value);

                if (selectedDateObj < currentDate) {
                  setError('Please select a date that is not in the past.');
                  return;
                } else {
                  setError(null);
                  setSelectedDate(e.target.value);
                }
              }}
              className="form-control mb-3"
            />

            {loading ? (
              <p>Loading students...</p>
            ) : error ? (
              <p className="text-danger">Error: {error}</p>
            ) : (
              studentsList.map((student) => (
                <div key={student.id}>
                  <label>
                    <input
                      type="checkbox"
                      checked={presentStudents.includes(student.id)}
                      onChange={() => {
                        if (presentStudents.includes(student.id)) {
                          setPresentStudents(presentStudents.filter(id => id !== student.id));
                        } else {
                          setPresentStudents([...presentStudents, student.id]);
                        }
                      }}
                    />
                    <span className='m-1'>{student.name}</span>
                  </label>
                </div>
              ))
            )}

            <button onClick={takeAttendance} className="btn btn-primary mt-2">
              Take Attendance
            </button>
          </div>
        )}

        {role === 'student' && (
          <div>
            <div>
              {!selectedCourse && (
                <h4>Select your course first</h4>
              )}
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="form-select mb-3"
              >
                <option value="">Select Course</option>
                <option value="Math101">Math</option>
                <option value="Physics101">Physics</option>
              </select>
              {/* Checkboxes for selecting months */}
              {
                selectedCourse && (
                  <div>
                    {getElapsedMonths().map((month) => (
                      <label key={month}>
                        <input
                          type="checkbox"
                          value={month}
                          checked={selectedMonths.includes(month)}
                          onChange={() => handleMonthCheckbox(month)}
                        />
                        <span className='m-1'>{month}</span>  
                      </label>
                    ))}
                  </div>
                )
              }

            </div>
            {loading ? (
              <p>Loading attendance...</p>
            ) : error ? (
              <p className="text-danger">Error: {error}</p>
            ) : (
              <div>
                {
                  selectedCourse && (
                    <button onClick={viewAttendance} className="btn btn-primary mt-2 mb-2">
                      View Attendance
                    </button>
                  )
                }


                {selectedCourse && attendanceData.length > 0 && (
                  <div>
                    <h3>Daily Attendance</h3>
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attendanceData.map((entry) => (
                          <tr key={entry.date}>
                            <td>{entry.date}</td>
                            <td>{entry.status}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {selectedMonths.length > 0 && (
                      <div>
                        <h3>Monthly Attendance</h3>
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Month</th>
                              <th>Attendance Percentage</th>
                            </tr>
                          </thead>
                          <tbody>
                            {selectedMonths.map((month) => (
                              <tr key={month}>
                                <td>{month}</td>
                                <td>{calculateAttendancePercentage(month)}%</td>
                              </tr>
                            ))}
                            <tr>
                              <td>Total</td>
                              <td>{calculateTotalAttendance()}%</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                )}


              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
