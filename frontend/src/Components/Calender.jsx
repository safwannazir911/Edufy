import React, { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleExclamation, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const Calendar = () => {
  const [events, setEvents] = useState([
    { "id": 1, "title": "Exam 1", "date": "2024-02-4" },
    { "id": 2, "title": "Homework Due", "date": "2024-01-15" },
    { "id": 2, "title": "Homework Due", "date": "2024-01-28" },
    { "id": 3, "title": "Quiz", "date": "2024-01-20" },
    { "id": 4, "title": "Project Presentation", "date": "2024-01-25" },
    { "id": 4, "title": "Project Presentation", "date": "2024-01-28" }
  ]);
  const [urgentEvents, setUrgentEvents] = useState([])
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
    fetchEvents()
    // fetchTeacherCourses();
  }, []);

  const fetchEvents = async () => {
    try {
      // if (role === 'teacher') {
      //   const requestOfEachCourseId = teacherCourses.map(course =>
      //     axios.get(`http://localhost:8000/events/${course.id}`)
      //   );
      //   const responses = await Promise.all(requestOfEachCourseId);
      //   const eventData = responses.map(response => response.data);
      //   setEvents(eventData || []);

      // }
      // else {
      //   setEvents(enrolledCourses.events)

      // }

      // Filter events for the next day
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const filteredEvents = events.filter(event => new Date(event.date) >= today && new Date(event.date) <= tomorrow);
      console.log(filteredEvents);
      setUrgentEvents(filteredEvents);

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
        await axios.post('http://localhost:8000/events/add', {
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

  const deleteEvent = async (eventId) => {
    try {
      // You need to implement your delete event API endpoint
      // Example: await axios.delete(`http://localhost:8000/events/${eventId}`);
      // After deleting, refresh the events
      axios.delete(`http://localhost:8000/events/${eventId}`)
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const eventContent = (arg) => {
    return (
      <div className='event'>
        {arg.event.title}
        {role === 'teacher' && (
          <button
            className='btn btn-sm btn-danger ms-2'
            onClick={() => deleteEvent(arg.event.id)}
          >
            <FontAwesomeIcon icon={faTrash} />

          </button>
        )}
      </div>
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
                  <option key={course.id} value={course.id}>
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

        
        {
          urgentEvents.length>0 && (
            <div>
              <h3>Events</h3>
              <h3>Urgent Events</h3>
              <ul className="list-group mb-2 ">
                {urgentEvents.map((event) => (
                  <li key={event.id} className="list-group-item urgrent_events">
                    {event.title} - {event.date}
                    <FontAwesomeIcon icon={faCircleExclamation}
                      style={{ float: "right", fontSize: "25px" }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )
        }


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
