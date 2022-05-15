# School

## admins can
    - assign course(s) to lecturers.

## student can: 
    - register a course.
    - can drop a course.

# Business Entities:

## 1.Students
     - id
     - firstname 
     - lastname 
     - age
     - gender
     
## 2.Lecturers
     - id
     - firstname
     - lastname
     - gender
     - age

## Course
     - name
     - units
     - code 

## 3.Admins
     - username



# Actions
* POST */students*  - create a new student
```json
{
  "firstname": string,
  "lastname": string,
  "age": Integer,
  "gender": string (M or F),
}
```

* PUT */students/courses* - Register a course
* returns

```json
{
  "status": 200,
  "message": "Registration successful",
  "data": {
    "name": string,
    "units": string,
    "code": string,
  }
}

```

* DELETE */students/courses* - Drop a course

```json
{
  "status": 200,
  "message": "Successfully dropped the course",
  "data": {
    "courses": {
      "name": string,
      "units": string,
      "code": string
    }
  }
}
```

* PUT *lecturers/:lecturer/course* - Assign a course to a lecturer

```json
{
  "status": 200,
  "message": "Course assigned to lecturer successfully",
  "data": {
    "name": string,
    "firstname": string,
    "lastname": string,
    "gender": string,
    "age": Integer,
    "courses": {
      "name": string,
      "units": Integer,
      "code": string
    }
  }
}

```