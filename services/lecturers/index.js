const conn = require('../../database/db');

LecturerServices = {

    findAll: (callback) => {
        this.statement = "SELECT * FROM lecturers";

        conn.query(this.statement, (err, res) => {

            if (err){
                console.log({ err });
                callback(err, null);
                return;
            }

            if (res.toString() === ''){
                callback(null, { type: "notFound" });
                return;
            }

            callback(null, res);
        });
    },

    findByID: (id, callback) => {
        this.statement = "SELECT * FROM lecturers WHERE id = ?";

        conn.query(this.statement, id, (err, res) => {
            if (err){
                console.log({ err });
                callback(err, null);
                return;
            }

            if (res.toString() === ''){
                callback(null, { type: "notFound" });
                return;
            }

            callback(null, res);
        });
    },

    findByEmail: (email, callback) => {
        this.statement = "SELECT * FROM lecturers WHERE email = ?";

        conn.query(this.statement, email, (err, res) => {
            if (err){
                callback(err, null);
                return;
            }

            if (res.toString() === ''){
                callback(null, { type: "notFound" });
                return;
            }

            callback(null,res);
        });
    },

    saveLecturer: (lecturer, callback) => {
        this.statement = `INSERT INTO lecturers (firstname, lastname, age, gender, admin, email) 
                          VALUES (? , ? , ? , ? , ?, ?)`;

        const values = [lecturer.firstname, lecturer.lastname, lecturer.age, lecturer.gender, lecturer.admin, lecturer.email];

        conn.query(this.statement, values, (err, res) => {
            if (err){
                callback(err, null);
                return;
            }

            callback(null, res);
        });
    },

    assign: (lecturerID, courseID, callback) => {
        this.statement = "INSERT INTO courses_lecturers (lec_id, course_id) VALUES(? , ?)";

        const values = [lecturerID, courseID];

        conn.query(this.statement, values, (err, res) => {
           if (err){
               callback(err, null);
               return;
           }

           callback(null, res);
        });
    },

    findAllCourses: (lecturerID, callback) => {

        this.statement = `SELECT * FROM courses WHERE id IN (SELECT course_id FROM courses_lecturers WHERE lec_id = ?)`;

        conn.query(this.statement, lecturerID, (err, res) => {
            if (err){
                callback(err, null);
                return;
            }

            if (res.toString() === ''){
                callback(null, { type: "notFound" });
                return;
            }

            callback(null, res);
        });
    },

}

module.exports = LecturerServices