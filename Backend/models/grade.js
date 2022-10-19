class Grade {
    constructor(studentCpr, universityName, course, grade) {
        this.studentCpr = studentCpr;
        this.universityName = universityName;
        this.course = course;
        this.grade = grade;
        this.date = new Date();
    }
}

export default Grade;