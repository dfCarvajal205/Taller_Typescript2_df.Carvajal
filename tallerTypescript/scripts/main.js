import { dataCourses } from './dataCourses.js';
import { dataStudents } from './dataStudents.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalCreditElm = document.getElementById("total-credits");
var btnfilterByCredit = document.getElementById("button-filterByCredit");
var inputSearchBoxMin = document.getElementById("search-boxMin");
var inputSearchBoxMax = document.getElementById("search-boxMax");
var studentsTbody = document.getElementById('students');
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredit.onclick = function () { return applyFilterByCredit(); };
renderCoursesInTable(dataCourses);
renderStudentesInTable(dataStudents);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentesInTable(students) {
    console.log('Desplegando estudiantes');
    students.forEach(function (student) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + student.name + "</td>\n                           <td>" + student.cedula + "</td>\n                           <td>" + student.codigo + "</td>\n                           <td>" + student.direccion + "</td>\n                           <td>" + student.edad + "</td>\n                           <td>" + student.telefono + "</td>";
        studentsTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCredit() {
    var textMin = inputSearchBoxMin.valueAsNumber;
    var textMax = inputSearchBoxMax.valueAsNumber;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredit(textMin, textMax, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByCredit(numKeyMin, numKeyMax, courses) {
    return courses.filter(function (c) { return c.credits >= numKeyMin && c.credits <= numKeyMax; });
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
