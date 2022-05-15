const CourseController = require('./controllers/CourseController');
const StudentsController = require('./controllers/StudentsController');
const LecturersController = require('./controllers/LecturersController');

const express = require('express');
const router  = express.Router();


// students endpoint
let studentsController = new StudentsController();
router.post('/api/students', studentsController.createStudent);
router.get('/api/students', studentsController.getAllStudents);
router.get('/api/students/:id', studentsController.getStudent);
router.get('/api/students/:id/courses', studentsController.getStudentCourse)
router.put('/api/students/:id/courses', studentsController.registerCourse);
router.delete('/api/students/:studentID/courses/:courseID', studentsController.deleteStudentCourse);


// courses endpoint
let courseController = new CourseController();
router.post('/api/courses', courseController.createCourse);
router.get('/api/courses', courseController.getAllCourses);
router.get('/api/courses/:id', courseController.getCourse);
router.delete('/api/courses/:id', courseController.deleteCourse);


// lecturers endpoint
let lecturerController = new LecturersController();
router.post('/api/lecturers', lecturerController.createLecturer);
router.get('/api/lecturers', lecturerController.getAllLecturers);
router.get('/api/lecturers/:id', lecturerController.getLecturer);
router.put('/api/lecturers/:id/courses', lecturerController.assignCourse);
router.get('/api/lecturers/:id/courses', lecturerController.getLecturerCourses);


module.exports = router;