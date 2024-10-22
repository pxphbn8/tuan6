const studentList = document.getElementById('student-list');
const studentForm = document.getElementById('student-form');
let editingStudentId = null;

async function fetchStudents() {
    const res = await fetch('/students');
    const students = await res.json();
    studentList.innerHTML = '';
    students.forEach(student => {
        const li = document.createElement('li');
        li.textContent = `${student.name}, MSSV: ${student.studentId}, Ngày sinh: ${new Date(student.dateOfBirth).toLocaleDateString()}`;
        
        const editButton = document.createElement('button');
        editButton.textContent = 'Sửa';
        editButton.onclick = () => editStudent(student);
        li.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Xóa';
        deleteButton.onclick = () => deleteStudent(student._id);
        li.appendChild(deleteButton);

        studentList.appendChild(li);
    });
}

async function addStudent(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const studentId = document.getElementById('studentId').value;
    const dateOfBirth = document.getElementById('dateOfBirth').value;

    if (editingStudentId) {
        await fetch(`/students/${editingStudentId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, studentId, dateOfBirth })
        });
        editingStudentId = null;
    } else {
        await fetch('/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, studentId, dateOfBirth })
        });
    }

    fetchStudents();
    studentForm.reset();
}

async function deleteStudent(id) {
    await fetch(`/students/${id}`, { method: 'DELETE' });
    fetchStudents();
}

function editStudent(student) {
    document.getElementById('name').value = student.name;
    document.getElementById('studentId').value = student.studentId;
    document.getElementById('dateOfBirth').value = student.dateOfBirth.split('T')[0];
    editingStudentId = student._id;
}

studentForm.addEventListener('submit', addStudent);
fetchStudents();
