const conn = require("../../database/db");

StudentServices = {

    findAll: (callback) =>  {
        this.statement = "SELECT * FROM students";

        conn.query(this.statement, (err, res) => {
            if (err) {
                console.log({err});
                callback(err, null);
                return;
            }

            if (res.toString() === "") {
                callback(null, {type: "notFound"},);
                return;
            }

            callback(null, res);
        });
    },

    findByID: (id, callback) => {
        this.statement = "SELECT * FROM students where id = ?";

        conn.query(this.statement, id, (err, res) => {
            if (err) {
                console.log({err});
                callback(err, null);
                return;
            }

            if (res.toString() === "") {
                callback(null, {type: "notFound"});
                return;
            }

            callback(null, res);
        })
    },

    findByEmail: (email, callback) => {
        this.statement = "SELECT * FROM students WHERE email = ?";

        conn.query(this.statement, email, (err, res) => {
            if (err) {
                console.log({err});
                callback(err, null);
                return;
            }

            callback(null, res);
        });
    },

    findAllCourses: (studentID, callback) => {

        this.statement = `SELECT * FROM courses WHERE id IN (SELECT course_id FROM courses_students WHERE stud_id = ?)`;

        conn.query(this.statement, studentID, (err, res) => {
            if (err){
                callback(err, null);
                return;
            }

            if (res.toString() === ''){
                callback(null, { type: "notFound" });
                return;
            }

            callback(null, res);
        })
    },

    saveStudent: (student, callback) => {

        this.statement = "INSERT INTO students (firstname, lastname, age, gender, email) VALUES (? , ? , ? , ? , ?)";

        const values = [student.firstname, student.lastname, student.age, student.gender, student.email];

        conn.query(this.statement, values, (err, res) => {

            if (err) {
                callback(err, null);
                return;
            }


            callback(null, res);
        });
    },

    addCourse: (studentID, courseID, callback) => {
        this.statement = `INSERT INTO courses_students (stud_id, course_id) VALUES (? , ?)`;

        const values = [studentID, courseID];

        conn.query(this.statement, values, (err, res) => {
            if (err){
                console.log({ err });
                callback(err, null);
                return;
            }

            callback(null, res);
        });
    },

    deleteCourse: (studentID, courseID, callback) => {
        this.statement = `DELETE FROM courses_students WHERE stud_id = ? AND course_id = ?`;

        const values = [studentID, courseID];

        conn.query(this.statement, values, (err, res) => {
           if (err){
               callback(err, null);
               return;
           }

           callback(null, res);
        });
    }
}


module.exports = StudentServices;