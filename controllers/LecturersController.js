const Lecturers = require('../models/Lecturer');
const lecturerServices = require('../services/lecturers/index');
const courseServices = require('../services/courses/index');
const {errorResponse, successResponse, successMessage,serverErrorResponse} = require("../helpers/ApiResponse");

class LecturersController {

    getAllLecturers(req, res) {

        lecturerServices.findAll((err, data) => {
            if (err){
                console.log({ err });
                serverErrorResponse(res);
            }

            // correct this in all controllers.
            if (data.type === "notFound"){
                errorResponse("No course fetched.", res, 404);
                return;
            }

            successResponse("All lecturers fetched.", data, res);
        });

   }

    getLecturer(req, res) {
        const id = req.params.id;

        lecturerServices.findByID(+id, (err, data) => {
            if (err){
                console.log({ err });
                serverErrorResponse(res);
                return;
            }

            if (data.type === "notFound"){
                errorResponse(`No lecturer with id ${id} exists.`, res, 404);
                return;
            }

            successResponse("Lecturer fetched.", data, res);
        })
    }

    createLecturer(req, res) {

        const { firstname, lastname, gender, age, admin, email } = req.body;

        lecturerServices.findByEmail(email, (err, data) => {

            if (err){
                console.log({ err });
                serverErrorResponse(res);
                return;
            }

            if (data.type !== "notFound"){
                errorResponse(`Email already exists.`, res);
                return;
            }

            let newLecturer = new Lecturers(firstname, lastname, +age, gender, +admin, email);
            lecturerServices.saveLecturer(newLecturer, (err) => {
                if (err){
                    console.log({ err });
                    serverErrorResponse(res);
                    return;
                }

                successMessage("Lecturer registered successfully.", res);
            });

        });
    }

    assignCourse(req, res) {

        const { id } = req.params;
        const { courseCode } = req.body;

        // check if the lecturer exists
        lecturerServices.findByID(+id, (err, data) => {
           if (err){
               console.log({ err });
               serverErrorResponse(res);
               return;
           }

           if (data.type === "notFound")
               errorResponse(`No lecturer with this id ${id} exists.`, res, 404);
        });

        courseServices.findCourseIDBy("code" , courseCode, (err, data) => {
            if (err){
                console.log({ err });
                serverErrorResponse(res);
                return;
            }

            if (data.type === "notFound")
                errorResponse(`No course with this code ${courseCode} exists.`, res, 404);

            let courseID = data[0].id;

            // Validate that the course has not been assigned to this lecturer before assigning it.

            lecturerServices.assign(+id, courseID, (err, data) => {
                if (err) {
                    console.log({ err });
                    serverErrorResponse(res);
                    return;
                }

                successMessage("Course assigned successfully." , res, 201);
            });
        });
    }

    getLecturerCourses(req, res) {

        const { id } = req.params;

        lecturerServices.findByID(+id, (err, data) => {

            if (err) {
                console.log({err});
                serverErrorResponse(res);
                return;
            }

            if (data.type === "notFound"){
                errorResponse(`Lecturer with id ${id} does not exists.`, res, 404);
                return;
            }

            lecturerServices.findAllCourses(+id, (err, data) => {
                if (err){
                    console.log({ err });
                    serverErrorResponse(res);
                    return;
                }

                if (data.type === "notFound"){
                    errorResponse("Lecturer has not been assigned any course", res, 404);
                    return;
                }

                successResponse("All lecturer's courses fetched", data, res);
            });
        });



    }

}

module.exports = LecturersController;