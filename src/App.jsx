import React, { useState,useEffect } from 'react'
import todo from './assets/todo_icon.png'
import Parents from './Components/Parents'
import Students from './Components/Students'

import EditParents from './Components/EditParents'
import EditStudent from './Components/EditStudent'

export default function App() {
  const [editingParent, setEditingParent] = useState(null);
  const [parents, setParents] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const storedParents = JSON.parse(localStorage.getItem("parents")) || [];
    const storedStudents = JSON.parse(localStorage.getItem("students")) || [];
    setParents(storedParents);
    setStudents(storedStudents);
  }, []);

  // ✅ Save to localStorage whenever parents change
  useEffect(() => {
    localStorage.setItem("parents", JSON.stringify(parents));
  }, [parents]);

  // ✅ Save to localStorage whenever students change
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // jab Parents form submit hoga, ye function chalega
  const handleAddParent = (parentData) => {
    const newParent = { id: Date.now(), ...parentData };
    setParents([...parents, newParent]); // parents list update
  };

  // Add Student
  const handleAddStudent = (studentData) => {
    const newStudent = { id: Date.now(), ...studentData };
    setStudents([...students, newStudent]);
  };

  // for dlt

  const handleDeleteParent = (parentId) => {
    setParents(parents.filter((p) => p.id !== parentId));
    setStudents(students.filter((s) => s.parentId !== parentId));
  };

  // Edit Parent
  const handleEditParent = (updatedParent) => {
    setParents(parents.map((p) => (p.id === updatedParent.id ? updatedParent : p)));
    setEditingParent(null);
  };

  const [editingStudent, setEditingStudent] = useState(null);

  const handleEditStudent = (updatedStudent) => {
    setStudents(students.map((s) => (s.id === updatedStudent.id ? updatedStudent : s)));
    setEditingStudent(null); // reset edit mode
  };


  return (
    <div className='bg-white place-self-center sm:items-center  lg:items-center  lg:flex lg:flex-col lg:p-7 lg:min-h-[550px] rounded-xl sm:p-6 md:p-7 w-full max-w-[1200px] mx-auto'>

      {/* title  */}

      <div className='flex items-center mt-4 sm:mt-7 gap-3 sm:ml-36 lg:ml-0'>
        <img src={todo} className='w-6 sm:w-8 mb-6 sm:mb-10 mt-2 sm:mt-3.5' alt='todo' />
        <h1 className='text-3xl font-semibold mb-10 mt-3.5 '> Parents-Students Todo list</h1>
      </div>

      {/* Parents  */}

      <div className='gap-7 flex flex-col items-center lg:flex-row'>
        <Parents onSave={handleAddParent} editingParent={editingParent}
          onUpdate={handleEditParent} />
        <Students parents={parents} onSave={handleAddStudent}
          editingStudent={editingStudent}
          onUpdate={handleEditStudent} />


      </div>

      <div className='flex flex-col lg:ml-7 sm:items-center lg:flex-row justify-between gap-6 w-[680px] '>
        <EditParents parents={parents}
          students={students}
          onDelete={handleDeleteParent}
          onEdit={(p) => setEditingParent(p)} />

        <EditStudent parents={parents}
          students={students}
          onDelete={(id) => setStudents(students.filter((s) => s.id !== id))}
          onEdit={(s) => setEditingStudent(s)} />
      </div>


    </div>
  )
}
