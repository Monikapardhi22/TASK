import React from 'react'
import dlt from '../assets/delete.png'

export default function EditParents({ parents, students, onEdit, onDelete }) {
  return (
    <div className='bg-white flex flex-col  rounded-xl p-4'>
      <h1 className='text-xl font-semibold'>
        Parents List
      </h1>
       {parents.length === 0 && <div>No parents yet.</div>}
      <ul className='mt-5'>
        {parents.map((p) => {
          const childCount = students.filter((s) => s.parentId === p.id).length;
          const kids = students.filter((s) => s.parentId === p.id);
          return (
            <li key={p.id} >
              <div style={{ display: "flex",flexDirection:'column' }}>
                <div>
                  <div className='text-lg font-bold'>{p.name}</div> <small className='text-[15px]'>({p.phone})</small>
                  <div style={{ fontSize: 15 }}>{p.email}</div>
                  <div style={{ marginTop: 6, fontSize: 15 }}>{childCount} student{childCount !== 1 ? "s" : ""}</div>
                </div>
                <div style={{ display: "flex", gap: 10}} className='mt-5'>
                  <button onClick={() => onEdit(p)} className='font-semibold border-[1px] bg-gray-100 px-1.5'>Edit</button>
                  <button onClick={() => { if (confirm(`Delete parent ${p.name}? This will also delete their students.`)) onDelete(p.id); }}>
                    <img src={dlt} className='w-8 h-7'/>
                  </button>
                </div>
              </div>
              {kids.length > 0 && (
                <div style={{ marginTop: 8 }}>
                  <div className=''>Students:</div>
                  <ul>
                    {kids.map((k) => (
                      <li key={k.id}>{k.name} — <small>{k.className}</small></li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  )
}
