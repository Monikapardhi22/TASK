import React, { useState,useEffect } from 'react'
import todo from '../assets/todo_icon.png'

export default function Students({parents, onSave, editingStudent, onUpdate}) {
  const [name, setName] = useState("");
  const [stclass, setStclass] = useState("");
  const [parentId, setParentId] = useState("");
  const [errors, setErrors] = useState({});

//   editing 
 useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setStclass(editingStudent.className);
      setParentId(editingStudent.parentId);
    }
  }, [editingStudent]);

  const handleSubmit = (e) => {
    e.preventDefault(); // page refresh rokta hai
    const newErrors = {};

    // Name validation
    if (!name.trim()) newErrors.name = "Name is required";

    // Class Validation 
    if (!stclass.trim()) newErrors.className = "Class is required";
 

    // parents
    if (!parentId) newErrors.parentId = "Parent must be selected";
    setErrors(newErrors);

   
    if (Object.keys(newErrors).length > 0) return;

    if (editingStudent) {
      // ✅ edit mode
      onUpdate({ ...editingStudent, name, className: stclass, parentId });
    } else {

    
    const studentData = { 
    name, 
    className: stclass, 
    parentId: Number(parentId)   
  };
  onSave(studentData);
    }

    // fields reset
    setName("");
    setStclass("");
    setParentId(parents.length > 0 ? parents[0].id : "");
    setErrors({});
  };

  return (
    <div className='bg-white place-self-center flex flex-col min-h-[250px] rounded-xl mr-6'>
      <h1 className='text-2xl font-medium flex gap-2'>
        <img src={todo} className='w-8' alt='todo'/> Add Student
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className='flex items-center bg-gray my-4 mt-5 w-[300px] border-[1px] rounded-md'>
          <label className='pl-7'>Name : </label>
          <input 
            type='text' 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder='Type Student Name' 
            className='bg-transparent border-none outline-none flex-1 h-12 pl-6 placeholder:text-slate-600'
          />
        </div>
        {errors.name && <div style={{color:"red", fontSize:'13px'}}>{errors.name}</div>}

        {/* Class */}
        <div className='flex items-center bg-gray my-4 w-[300px] border-[1px] rounded-md'>
          <label className='pl-7'>Class : </label>
          <input 
            type='text' 
            value={stclass} 
            onChange={(e) => setStclass(e.target.value)} 
            placeholder='e.g.10A' 
            className='bg-transparent border-none outline-none flex-1 h-12 pl-6 placeholder:text-slate-600'
          />
        </div>
        {errors.className && <div style={{color:"red", fontSize:'13px'}}>{errors.className}</div>}
         


         {/* linked parents  */}
 <div className='flex items-center bg-gray overflow-hidden my-4 w-[300px] border-[1px] rounded-md'>
         <label className='pl-7'>
        Parent
        <select className='bg-transparent border-none outline-none flex-1 h-12 pl-6 ' value={parentId} onChange={(e) => setParentId(e.target.value)}>
          <option value=""  >-- select parent --</option>
          {parents.map((p) => (
            <option key={p.id} value={p.id}>{p.name} ({p.phone})</option>
          ))}
        </select>
        {errors.parentId && <div style={{color:'red'}}>{errors.parentId}</div>}
      </label>
      </div>
        {/* Buttons */}
       
         <div className='flex items-center my-4 gap-1.5'>
          <button type='submit' className='px-2 rounded-md bg-gray-50 border-[1px] hover:bg-blue-100'>Save</button>
          <button 
            type="button"
            onClick={() => {  setName(""); setStclass(""); setErrors({}); }} 
            className='px-2 rounded-md border-[1px] bg-gray-50 hover:bg-blue-100'
          >Cancel</button>
        </div>
      </form>
    </div>
  )
}
