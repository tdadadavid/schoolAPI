const conn = require('../../database/db');

CoursesServices = {

    findAll: (callback) => {
        this.statement = "SELECT * FROM courses";

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
        this.statement = "SELECT * FROM courses WHERE id = ?";

        conn.query(this.statement, id, (err, res) => {
            if (err){
                console.log({ err });
                callback(err, null);
                return;
            }

            if (res.toString() === ''){
                callback(null,{ type: "notFound" });
                return;
            }

            callback(null, res);
        })
    },

    saveCourse: (course, callback) => {
        this.statement = "INSERT INTO courses (name, units, code) VALUES (? , ? , ?)";

        const values = [course.name, course.units, course.code];

        conn.query(this.statement, values, (err, res) => {
            if (err) {
                console.log({err});
                callback(err, null)
                return;
            }

            callback(null, res);
        });
    },

    deleteByID: (id, callback) => {
        this.statement = "DELETE FROM courses WHERE id = ?";

        conn.query(this.statement, id, (err, res) => {
            if (err){
                console.log({ err });
                callback(err);
            }

            console.log({ res });

            callback(null);
        });

    },

    findCourseByCode: (code, callback) => {
        this.statement = " SELECT * FROM courses WHERE code = ?";

        conn.query(this.statement, code, (err, res) => {
            if (err){
                console.log({ err });
                callback(err, null);
                return;
            }

            callback(null, res);
        });
    },

    findCourseIDBy: (via, value, callback) => {
        this.statement = `SELECT id FROM courses WHERE ${via} = ?`;

        conn.query(this.statement, value, (err, res) => {
            if (err){
                callback(err, null);
                return;
            }

            if (res.toString() === '') {
                callback(null, {type: "notFound"});
                return;
            }

            callback(null, res);
        });
    }
}

module.exports = CoursesServices;