import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import axios from 'axios';

const Calendar = () => {
  const [events, setEvents] = useState([
    { "id": 1, "title": "Exam 1", "date": "2024-01-10" },
    { "id": 2, "title": "Homework Due", "date": "2024-01-15" },
    { "id": 3, "title": "Quiz", "date": "2024-01-20" },
    { "id": 4, "title": "Project Presentation", "date": "2024-01-25" }
  ]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [teacherCourses, setTeacherCourses] = useState([{
    "id": "course1",
    "title": "Programming",
    "description": "Learn programming fundamentals",
    "book_ids": ["dxV-DwAAQBAJ", "s1gVAAAAYAAJ"]
  }, {
    "id": "course2",
    "title": "HTML",
    "description": "Learn programming fundamentals",
    "book_ids": ["s1gVAAAAYAAJ", "dxV-DwAAQBAJ"]
  }
  ]);  // State to store teacher's courses

  const [enrolledCourses, setEnrolledCourses] = useState([{
    "id": "course1",
    "title": "Programming",
    "description": "Learn programming fundamentals",
    "book_ids": ["dxV-DwAAQBAJ", "dxV-DwAAQBAJ"],
    'events': [{ "id": 1, "title": "Exam 1", "date": "2024-01-10" }]
  },
  {
    "id": "course2",
    "title": "Mathematics",
    "description": "Explore mathematical concepts",
    "book_ids": ["dxV-DwAAQBAJ", "s1gVAAAAYAAJ"],
    'events': [{ "id": 1, "title": "Exam 1", "date": "2024-01-10" }]
  }]); // State to store enrolled courses for a student

  // const username = localStorage.getItem('username');
  // const role = localStorage.getItem('role');

  const username = "Safwan";
  const role = 'teacher'; // Assuming a default role for testing
  useEffect(() => {
    // Fetch events for the selected course when the component mounts
    // fetchEvents()
    // fetchTeacherCourses();
  }, []);

  const fetchEvents = async () => {
    try {
      if (role === 'teacher') {
        const requestOfEachCourseId = teacherCourses.map(course =>
          axios.get(`http://localhost:8000/events/${course.id}`)
        );
        const responses = await Promise.all(requestOfEachCourseId);
        const eventData = responses.map(response => response.data);
        setEvents(eventData || []);

      }
      else {
        setEvents(enrolledCourses.events)

      }



    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchTeacherCourses = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/teacher/courses/${username}`);
      setTeacherCourses(response.data || []);
    } catch (error) {
      console.error('Error fetching teacher courses:', error);
    }
  };

  // Function to fetch enrolled courses for a student
  // const fetchEnrolledCourses = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:8000/student/enrolled-courses/${username}`);
  //     setEnrolledCourses(response.data || []);
  //   } catch (error) {
  //     console.error('Error fetching enrolled courses:', error);
  //   }
  // };
  const addEvent = async () => {
    try {
      if (title && date && selectedCourseId) {
        await axios.post('http://localhost:8000/events', {
          id: selectedCourseId,
          title,
          date,
        });
        // Refresh events after adding a new one
        // fetchEvents();
        // Clear form inputs
        setTitle('');
        setDate('');
      }
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const eventContent = (arg) => {
    return (
      <>
        <div className='event'>{arg.event.title}</div>
      </>
    );
  };



  return (
    <div className='m-4'>
      <h2 className='mb-4'>Calendar</h2>
      <div>
        <div className='mb-4'>
          <h1>Welcome, {username && username.split('@')[0]}!</h1>
          <p>Role: {role}</p>
        </div>
      </div>
      {
        role === "teacher" && (
          <>
            <div className='mb-3'>
              <label className='form-label'>Select Course: </label>
              <select
                value={selectedCourseId}
                onChange={(e) => setSelectedCourseId(e.target.value)}
                className='form-select'
              >
                <option>Select your Course</option>
                {/* Populate dropdown with teacher's courses */}
                {teacherCourses.map(course => (
                  <option key={course.course_id} value={course.id}>
                    {course.title}
                  </option>
                ))}
              </select>
            </div>
            <div className='mb-3'>
              <label className='form-label'>Title:</label>
              <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} className='form-control' />
            </div>
            <div className='mb-3'>
              <label className='form-label'>Date:</label>
              <input type='date' value={date} onChange={(e) => setDate(e.target.value)} className='form-control' />
            </div>
            <button onClick={addEvent} className='btn btn-primary'>Add Event</button>
          </>
        )
      }


      <div className='mt-4'>
        <h3>Events</h3>

        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView='dayGridMonth'
          events={events.map((event) => ({ title: event.title, date: event.date }))}
          eventContent={eventContent}
        />

      </div>
    </div>
  );
};

export { Calendar };
