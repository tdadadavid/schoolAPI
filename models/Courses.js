const conn = require('../database/db')
const {compileETag} = require("express/lib/utils");

class Courses {

    constructor(name, units, code) {
        this.name = name;
        this.units = units;
        this.code = code;
    }



}

module.exports = Courses;