const conn = require('../database/db');

class Lecturers {

    constructor(firstname, lastname, age, gender, admin, email) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.age = age;
        this.gender = gender;
        this.email = email;
        this.admin = 0;
    }

}


module.exports = Lecturers;