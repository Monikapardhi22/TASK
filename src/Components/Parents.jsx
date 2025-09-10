import React, { useState,useEffect } from 'react'
import todo from '../assets/todo_icon.png'

export default function Parents({ onSave, editingParent, onUpdate  }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingParent) {
      setName(editingParent.name);
      setEmail(editingParent.email);
      setPhone(editingParent.phone);
    }
  }, [editingParent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      newErrors.email = "Invalid email format";
    if (!phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^[0-9]{7,15}$/.test(phone.trim()))
      newErrors.phone = "Phone must be 7–15 digits";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    if (editingParent) {
      // ✅ Update existing parent
      onUpdate({ ...editingParent, name, email, phone });
    } else {
    onSave({ name, email, phone });
    }
    // reset form
    setName("");
    setEmail("");
    setPhone("");
    setErrors({});
  };

  return (
    <div className='bg-white flex flex-col min-h-[250px] rounded-xl p-4'>
      <h1 className='text-2xl font-medium flex gap-2'>
        <img src={todo} className='w-8' alt='todo'/> Add Parents
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className='flex items-center my-4 w-[300px] border-[1px] rounded-md'>
          <label className='pl-7'>Name :</label>
          <input 
            type='text' value={name} 
            onChange={(e)=>setName(e.target.value)} 
            placeholder='Type Parent Name'
            className='bg-transparent border-none outline-none flex-1 h-12 pl-6'
          />
        </div>
        {errors.name && <div style={{color:"red"}}>{errors.name}</div>}

        {/* Email */}
        <div className='flex items-center my-4 w-[300px] border-[1px] rounded-md'>
          <label className='pl-7'>Email :</label>
          <input 
            type='email' value={email} 
            onChange={(e)=>setEmail(e.target.value)} 
            placeholder='Type Parent Email'
            className='bg-transparent border-none outline-none flex-1 h-12 pl-6'
          />
        </div>
        {errors.email && <div style={{color:"red"}}>{errors.email}</div>}

        {/* Phone */}
        <div className='flex items-center my-4 w-[300px] border-[1px] rounded-md'>
          <label className='pl-7'>Phone :</label>
          <input 
            type='tel' value={phone} 
            onChange={(e)=>setPhone(e.target.value)} 
            placeholder='Type Parent Phone no.'
            className='bg-transparent border-none outline-none flex-1 h-12 pl-6'
          />
        </div>
        {errors.phone && <div style={{color:"red"}}>{errors.phone}</div>}

        {/* Buttons */}
        <div className='flex items-center my-4 gap-1.5'>
          <button type='submit' className='px-2 rounded-md bg-gray-50 hover:bg-blue-100 border-[1px]'>Save</button>
          <button 
            type="button"
            onClick={() => { setEmail(""); setName(""); setPhone(""); setErrors({}); }} 
            className='px-2 rounded-md border-[1px] bg-gray-50 hover:bg-blue-100'
          >Cancel</button>
        </div>
      </form>
    </div>
  )
}
