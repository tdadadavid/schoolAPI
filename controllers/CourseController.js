const Course = require('../models/Courses');
const courseServices = require('../services/courses/index');
const {errorResponse, serverErrorResponse, successResponse, successMessage} = require("../helpers/ApiResponse");

class CourseController {

    getAllCourses(req , res){
        courseServices.findAll((err, data) => {
            if(err){
                serverErrorResponse(res);
                return;
            }

            if (data.type === "notFound"){
                errorResponse("No course fetched.", res, 404);
                return;
            }


            successResponse("All courses fetched.", data, res);
        });
    }

    getCourse(req, res){
        const { id } = req.params;

        courseServices.findByID(+id, (err, data) => {
            if (err){
                console.log({ err });
                serverErrorResponse(res);
                return;
            }

            if (data.type === "notFound"){
                errorResponse(`No course with id ${id} exists`, res, 404);
                return;
            }

            successResponse("Course fetched.", data, res);
        });
    }

    createCourse(req, res){
        const { name, units, code } = req.body;

        courseServices.findCourseByCode(code, (err, data) => {

            if (err){
                serverErrorResponse(res);
                return;
            }

            if (data.toString() !== ''){
                errorResponse("Course already exists.", res, 400);
            }else{

                let newCourse = new Course(name, units, code);

                courseServices.saveCourse(newCourse, (err) => {
                    if (err){
                        serverErrorResponse(res);
                        return;
                    }

                    successMessage("Course registered successfully.", res);
                });
            }
        });
    }

    deleteCourse(req, res){

        const id = req.params.id;

        courseServices.findByID(+id, (err, data) => {

            if (err){
                if (err.type === "notFound"){
                    errorResponse(`No course with id ${id} exists`, res, 404);
                    return;
                }

                serverErrorResponse(res);
                return;
            }

            courseServices.deleteByID(+id, (err) => {
                if (err){

                    if (err.type === "notFound"){
                        errorResponse(`Cannot delete a course that does not exist.`, res, 404);
                        return;
                    }
                }

                successMessage("Course deleted successfully.", res);
            });
        });
    }

}

module.exports = CourseController;