import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';


export const Courses = () => {
  const [courses, setCourses] = useState([
    {
      "id": 1,
      "title": "Introduction to Programming",
      "description": "Learn the basics of programming with this introductory course."
    },
    {
      "id": 2,
      "title": "Web Development Fundamentals",
      "description": "Explore the fundamentals of web development, including HTML, CSS, and JavaScript."
    },
    {
      "id": 3,
      "title": "Data Science Essentials",
      "description": "Dive into the essentials of data science, including data analysis and visualization."
    },
    {
      "id": 4,
      "title": "Machine Learning Basics",
      "description": "Get started with the basics of machine learning and predictive modeling."
    },
    {
      "id": 5,
      "title": "Advanced ReactJS",
      "description": "Take your ReactJS skills to the next level with this advanced course on building dynamic web applications."
    }
  ]);

  const [enrolledCourses, setEnrolledCourses] = useState([{
    "id": 5,
    "title": "Advanced ReactJS",
    "description": "Take your ReactJS skills to the next level with this advanced course on building dynamic web applications."
  },
  {
    "id": 4,
    "title": "Machine Learning Basics",
    "description": "Get started with the basics of machine learning and predictive modeling."
  }
  ]); // New state to track enrolled courses

  const [newCourse, setNewCourse] = useState({ title: '', description: '' });
  const [updateCourse, setUpdateCourse] = useState({ id: null, title: '', description: '' });
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  // Assuming you have a username and role (replace with actual data)
  // const username = localStorage.getItem("username");
  // const role = localStorage.getItem("role");

  const username = "safwan";
  const role = "student";

  useEffect(() => {
    // Fetch and display all courses when the component mounts
    // fetchCourses();
    // fetchEnrolledCourses();
  }, []);

  // Other functions (createCourse, deleteCourse, fetchCourses) remain unchanged
  const fetchCourses = () => {
    // Make an API call to fetch all courses
    axios.get('http://localhost:8000/courses/all')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching courses:', error);
      });
  };

  const fetchEnrolledCourses = () => {
    // Make an API call to fetch enrolled courses for the student
    // Replace the endpoint with your actual implementation
    axios.get(`http://localhost:8000/student/enrolled-courses/${username}`)
      .then(response => {
        setEnrolledCourses(response.data);
      })
      .catch(error => {
        console.error('Error fetching enrolled courses:', error);
      });
  };
  const createCourse = () => {
    // Make an API call to create a new course
    axios.post('http://localhost:8000/courses/create', newCourse)
      .then(() => {
        // Refresh the course list after creating a new course
        fetchCourses();
        // Reset the newCourse state
        setNewCourse({ title: '', description: '' });
      })
      .catch(error => {
        console.error('Error creating course:', error);
      });
  };

  const deleteCourse = (courseId) => {
    // Make an API call to delete the selected course
    axios.delete(`http://localhost:8000/courses/delete/${courseId}`)
      .then(() => {
        // Refresh the course list after deleting a course
        fetchCourses();

      })
      .catch(error => {
        console.error('Error deleting course:', error);
      });
  };

  const handleUpdateModalClose = () => {
    setShowUpdateModal(false);
  };

  const handleUpdateModalShow = (course) => {
    setUpdateCourse({ id: course.id, title: course.title, description: course.description });
    setShowUpdateModal(true);
  };

  const handleUpdateCourse = () => {
    // Make an API call to update the selected course
    axios.put(`http://localhost:8000/courses/update/${updateCourse.id}`, {
      title: updateCourse.title,
      description: updateCourse.description
    })
      .then(() => {
        // Reset the update state, close the modal, and refresh the course list after updating a course
        setUpdateCourse({ id: null, title: '', description: '' });
        setShowUpdateModal(false);
        // fetchCourses();
      })
      .catch(error => {
        console.error('Error updating course:', error);
      });
  };
  const handleEnrollCourse = (courseId) => {
    // Make an API call to enroll the student in the selected course
    // You need to implement the actual API endpoint for enrolling
    axios.post(`http://localhost:8000/enrollments/enroll/${courseId}`, { studentUsername: username })
      .then(() => {
        // You can handle the enrollment success, e.g., show a message
        console.log('Enrolled successfully!');
      })
      .catch(error => {
        console.error('Error enrolling in the course:', error);
      });
  };


  return (
    <div className='m-4'>
      <h2>Courses</h2>
      <div className="container">
        <div className="row">
          <div className="col-md-9">
            {role && (
              <>
                <h1>Welcome, {username && username.split('@')[0]}!</h1>
                <p>Role: {role}</p>
              </>
            )}

            {role === 'teacher' && (
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="New Course Title"
                  value={newCourse.title}
                  onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                />
                <textarea
                  className="form-control mt-2"
                  placeholder="New Course Description"
                  value={newCourse.description}
                  onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
                ></textarea>
                <button className="btn btn-primary mt-2" onClick={createCourse}>Create Course</button>
              </div>
            )}

            <ul className="list-group">
              {courses.map(course => (
                <li key={course.id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <h5>{course.title}</h5>
                    <p>{course.description}</p>
                  </div>
                  {role === 'teacher' && (
                    <>
                      <button className="btn btn-warning me-2" onClick={() => handleUpdateModalShow(course)}>Update</button>
                      <button className="btn btn-danger" onClick={() => deleteCourse(course.id)}>Delete</button>
                    </>
                  )}
                  {role === 'student' && (
                    <button
                      className="btn btn-primary"
                      onClick={() => handleEnrollCourse(course.id)}
                      disabled={enrolledCourses.some(enrolledCourse => enrolledCourse.id === course.id)}
                    >
                      {enrolledCourses.some(enrolledCourse => enrolledCourse.id === course.id) ? 'Enrolled' : 'Enroll'}
                    </button>
                  )}
                </li>
              ))}
            </ul>

            {updateCourse.id && (
              <Modal show={showUpdateModal} onHide={handleUpdateModalClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Update Course</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Updated Course Title"
                    value={updateCourse.title}
                    onChange={(e) => setUpdateCourse({ ...updateCourse, title: e.target.value })}
                  />
                  <textarea
                    className="form-control mt-2"
                    placeholder="Updated Course Description"
                    value={updateCourse.description}
                    onChange={(e) => setUpdateCourse({ ...updateCourse, description: e.target.value })}
                  ></textarea>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleUpdateModalClose}>
                    Close
                  </Button>
                  <Button variant="success" onClick={handleUpdateCourse}>
                    Update Course
                  </Button>
                </Modal.Footer>
              </Modal>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
