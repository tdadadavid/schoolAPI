const Student = require("../models/Student");
const Courses = require('../models/Courses');
const studentsServices = require('../services/students/index');
const courseServices = require('../services/courses/index');
const {errorResponse, successResponse, serverErrorResponse, successMessage} = require("../helpers/ApiResponse");
const students = new Student();

class StudentsController {

    getAllStudents(req, res){
        studentsServices.findAll((err, data) => {
           if (err){
               console.log({ Error: err});
               serverErrorResponse(res);
               return;
           }

            if (data.type === "notFound"){
                errorResponse("No student resource", res, 404);
                return;
            }

            successResponse("All students resource fetched.", data, res);
        });
    }

    getStudent(req, res){

        const id = req.params.id;

        studentsServices.findByID(+id, (err, data) =>  {
            if (err){
                console.log({ err });
                serverErrorResponse(res);
                return;
            }

            if (data.type === "notFound"){
                errorResponse(`No student found with this id ${id}.`);
                return;
            }

            successResponse("Student fetched.", data, res,);
        });
    }

    createStudent(req, res){

        const { firstname, lastname, age, gender, email } = req.body;

        studentsServices.findByEmail(email, (err, data) =>  {

           if(data.toString() !== ''){
               errorResponse("Email already in use.", res, 400);
           }else{

               // create a new student
               const newStudent = new Student(firstname,lastname,age,gender, email);
               studentsServices.saveStudent(newStudent, (err, data) => {
                   if (err){
                       console.log({ err });
                       serverErrorResponse(res);
                       return;
                   }
                   successMessage("Student registered successfully.", res, 201);
               });
           }
        });
    }

    registerCourse(req, res){

        let { id } = req.params;
        let { courseCode } = req.body;

       studentsServices.findByID(+id, (err, data) => {
            if(err) {
                console.log({ err });
                serverErrorResponse(res);
                return;
            }

            if (data.type === "notFound")
                errorResponse(`Student with the given id ${id} does not exists.`, res, 404);
        });


        courseServices.findCourseByCode(courseCode, (err, data) => {
            if(err) {
                console.log({ err });
                serverErrorResponse(res);
                return;
            }

            if (data.type === "notFound")
                errorResponse(`Student with the given id ${id} does not exists.`, res, 404);
        });

        courseServices.findCourseIDBy("code", courseCode, (err, data) => {
            if (err){
                console.log({ err });
                serverErrorResponse(res);
                return;
            }

            if (data.type === "notFound")
                errorResponse(`No course with this code ${courseCode} exists.`, res, 404);

            let courseID = data[0].id;

            // Validate if the student has registered this course before.

            studentsServices.addCourse(id, courseID, (err, data) => {
                if (err){
                    console.log({ err });
                    serverErrorResponse(res);
                    return;
                }

                successMessage("Course registration successful.", res, 200);
            });
        });
    }

    getStudentCourse(req, res){

        const { id } = req.params;

        studentsServices.findByID(+id, (err, data) => {
            if (err) {
                console.log({err});
                serverErrorResponse(res);
                return;
            }

            if (data.type === "notFound"){
                errorResponse(`Student with id ${id} does not exists.`, res, 404);
                return;
            }

            studentsServices.findAllCourses(+id, (err, data) => {
                if (err){
                    console.log({ err });
                    serverErrorResponse(res);
                    return;
                }

                if (data.type === "notFound"){
                    errorResponse("Student has no registered course", res, 404);
                    return;
                }

                successResponse("All student's courses fetched", data, res);
            });
        });


    }

    deleteStudentCourse(req, res){

        const { studentID, courseID } = req.params;

        studentsServices.findByID(+studentID, (err, data) => {
            if (err){
                console.log({ err });
                serverErrorResponse(res);
                return;
            }

            if (data.type === "notFound") {
                errorResponse(`No student found with this id ${studentID}.`, res, 404);
                return;
            }

            courseServices.findByID(+courseID, (err, data) => {
                if (err){
                    console.log({ err });
                    serverErrorResponse(res);
                    return;
                }

                if (data.type === "notFound"){
                    errorResponse(`No course with id ${courseID} exists`, res, 404);
                    return;
                }

                studentsServices.deleteCourse(+studentID, +courseID, (err, data) => {
                    if (err){
                        console.log({ err });
                        serverErrorResponse(res);
                        return;
                    }

                    successMessage("Course dropped successfully", res);
                });
            });
        });




    }

}

module.exports = StudentsController;