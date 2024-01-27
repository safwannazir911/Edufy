import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Library = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [courseId, setCourseId] = useState(''); // State to store the selected course ID
  const [enrolledCourses, setEnrolledCourses] = useState([{
    "id": "course1",
    "title": "Programming",
    "description": "Learn programming fundamentals",
    "book_ids": ["dxV-DwAAQBAJ", "dxV-DwAAQBAJ"]
  },
  {
    "id": "course2",
    "title": "Mathematics",
    "description": "Explore mathematical concepts",
    "book_ids": ["dxV-DwAAQBAJ", "s1gVAAAAYAAJ"]
  }]); // State to store enrolled courses for a student

  // const username = localStorage.getItem('username');
  const username = "Safwan";
  const role = 'student'; // Assuming a default role for testing
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

  useEffect(() => {
    // fetchEnrolledCourses(); // Fetch enrolled courses when the component mounts
    fetchBooks(); // Fetch books based on the search query
    // if (role === 'teacher') {
    //   fetchTeacherCourses();
    // }
  }, []); // Refetch books when the course ID changes

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

  const fetchBooks = async () => {
    try {
      setLoading(true);
      setError(null);

      let allBookIds;
      if (role === 'student') {
        allBookIds = enrolledCourses.flatMap(course => course.book_ids);
      }
      else {
        allBookIds = teacherCourses.flatMap(course => course.book_ids);
      }
      const uniqueBookIds = Array.from(new Set(allBookIds));


      const bookRequests = uniqueBookIds.map(bookId =>
        axios.get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
      );

      const responses = await Promise.all(bookRequests);
      const booksData = responses.map(response => response.data);

      setBooks(booksData || []);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('An error occurred while fetching books. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const searchBooks = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('https://www.googleapis.com/books/v1/volumes', {
        params: {
          q: `${query}`, // Corrected variable name
        },
      });

      setBooks(response.data.items || []);
    } catch (error) {
      console.error('Error fetching books:', error);
      setError('An error occurred while fetching books. Please try again.');
    } finally {
      setLoading(false);
    }
  };




  //add the book_id to the course model
  const addBook = async (bookId) => {
    try {
      if (!courseId) {
        alert('Please select a course ID before adding the book.');
        return;
      }

      await axios.post(`http://localhost:8000/courses/${courseId}`, { book_id: bookId }); // Replace with your backend endpoint
      alert('Book added successfully!');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className='m-4'>
      <h2 className='mb-4'>Library</h2>
      <div>
        <div className='mb-4'>
          <h1>Welcome, {username && username.split('@')[0]}!</h1>
          <p>Role: {role}</p>
        </div>

        {/* Dropdown for selecting course ID */}
        {role === 'teacher' && (
          <div className='mb-3'>
            <label htmlFor='courseId'>Select Course ID: </label>
            <select
              id='courseId'
              value={courseId}
              onChange={(e) => setCourseId(e.target.value)}
              className='form-control'
            >
              <option >Select your Course</option>
              {/* Populate dropdown with teacher's courses */}
              {teacherCourses.map(course => (
                <option key={course.course_id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Search bar */}
        <div className='mb-4'>
          <input
            type='text'
            placeholder='Search for books'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='form-control'
          />
          <button onClick={searchBooks} disabled={loading} className='btn btn-primary mt-4'>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {/* Display search results */}
        <div>
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {books.length === 0 && !loading && !error && <p>No books found.</p>}

          {books.length > 0 && (


            <div className='row row-cols-1 row-cols-md-3 g-4'>
              {books.map((book) => {
                const isBookInTeacherCourses = teacherCourses.some(course => course.book_ids.includes(book.id));

                console.log(`Book ID: ${book.id}, Is in Teacher Courses: ${isBookInTeacherCourses}`);

                return (
                  <div key={book.id} className='col-3'>
                    <div className='card h-100 book-card'>
                      <img
                        src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
                        alt={book.volumeInfo.title}
                        className='card-img-top book-image'
                      />
                      <div className='card-body'>
                        <h5 className='card-title'>{book.volumeInfo.title}</h5>
                        <p className='card-text'>By {book.volumeInfo.authors?.join(', ')}</p>
                      </div>
                      {role && (
                        <div className='card-footer'>
                          <a href={book.volumeInfo.previewLink} target='_blank' rel='noopener noreferrer' className='btn btn-primary m-1'>
                            View
                          </a>
                          <a href={book.volumeInfo.previewLink} download className='btn btn-success'>
                            Download
                          </a>
                        </div>
                      )}
                      {role === 'teacher' && !isBookInTeacherCourses && (
                        <div className='card-footer'>
                          <button
                            onClick={() => addBook(book.id)}
                            className='btn btn-primary'
                          >
                            Add Book
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>


          )}
        </div>
      </div>
    </div>
  );
};

export { Library };
