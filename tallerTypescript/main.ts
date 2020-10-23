import { Course } from './course.js';

import { Student } from './student.js';

import { dataCourses } from './dataCourses.js';

import { dataStudents } from './dataStudents.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

const btnfilterByCredit: HTMLElement = document.getElementById("button-filterByCredit")!;
const inputSearchBoxMin: HTMLInputElement = <HTMLInputElement> document.getElementById("search-boxMin")!;
const inputSearchBoxMax: HTMLInputElement = <HTMLInputElement> document.getElementById("search-boxMax")!;

let studentsTbody: HTMLElement = document.getElementById('students')!;

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredit.onclick = () => applyFilterByCredit();

renderCoursesInTable(dataCourses);

renderStudentesInTable(dataStudents);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudentesInTable(students: Student[]): void {
  console.log('Desplegando estudiantes');
  students.forEach((student) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${student.name}</td>
                           <td>${student.cedula}</td>
                           <td>${student.codigo}</td>
                           <td>${student.direccion}</td>
                           <td>${student.edad}</td>
                           <td>${student.telefono}</td>`;
    studentsTbody.appendChild(trElement);
  });
}

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByCredit() { 
  let textMin = inputSearchBoxMin.valueAsNumber;
  let textMax = inputSearchBoxMax.valueAsNumber;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCredit(textMin, textMax, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByCredit(numKeyMin: number, numKeyMax: number,  courses: Course[]) {
  return courses.filter( c => c.credits >= numKeyMin && c.credits <= numKeyMax);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}