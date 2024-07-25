//variables globales
const elements = {
    studentID: document.querySelector('#studentID'),
    studentName: document.querySelector('#studentName'),
    studentCourse: document.querySelector('#studentCourse'),
    studentSave: document.querySelector('#studentSave'),
    studentTable: document.querySelector('#studentTable')
};

//arreglo para guardar los datos del backend
let students = [];

//constante para almacenar la URL
const API_URL = 'https://demo-api-rest-render.onrender.com/api/v1/students';

document.addEventListener('DOMContentLoaded', () => {
    getAllStudents();
});


const getAllStudents = async () => {
    try {

        const response = await fetch(API_URL);

        if (!response.ok) {
            throw Error(`Error al solicitar los datos ${response.statusText}`)
        }
        const data = await response.json();
        students = data;
        console.log(students);
        renderStudents();

    } catch (error) {
        console.log(`Error ${error.message}`);
    }

}


const renderStudents = () => {
    elements.studentTable.innerHTML = students.map(student => `
    <tr>
        <th scope="row">${student.id}</th>
        <td>${student.name}</td>
        <td>${student.course}</td>
        <td>
        <button type="submit" class="btn btn-warning" onclick = editStudent(${student.id}) >Editar</button>
        <button type="submit" class="btn btn-danger"onclick = deleteStudent(${student.id})>Eliminar</button>
        </td>
</tr>
`).join('');
}

const editStudent = id => {
    const student = students.find(student => student.id === id);
    if (student) {
        elements.studentID.value = student.id;
        elements.studentName.value = student.name;
        elements.studentCourse.value = student.course;
    }

}

const deleteStudent = async id => {
    try {

        const reponse = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (!reponse.ok) {
            throw Error(`Error al borrar estudiante: ${reponse.statusText}`)
        }
        alert('Estudiante borrado con exito!!!');
        getAllStudents();
       
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}


elements.studentSave.addEventListener('click', (e) => {
    e.preventDefault();
    const student = {
        id: elements.studentID.value,
        name: elements.studentName.value,
        course: elements.studentCourse.value
    };

    student.id ? updateStudent(student) : addStudent(student);

})

const updateStudent = async student => {
    try {

        const reponse = await fetch(`${API_URL}/${student.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student)
        });

        if (!reponse.ok) {
            throw Error(`Error al actualizar estudiante: ${reponse.statusText}`)
        }
        alert('Estudiante actualizado con exito!!!');
        getAllStudents();
        formReset();

    } catch (error) {
        console.log(`Error: ${error.message}`);
    }


}

const addStudent = async student => {

    try {

        const reponse = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(student)
        });

        if (!reponse.ok) {
            throw Error(`Error a registrar estudiante: ${reponse.statusText}`)
        }
        alert('Estudiante agregado con exito!!!');
        getAllStudents();
        formReset();

    } catch (error) {
        console.log(`Error: ${error.message}`);
    }


}

const formReset = () => {
    elements.studentID.value = '';
    elements.studentName.value = '';
    elements.studentCourse.value = '';
}