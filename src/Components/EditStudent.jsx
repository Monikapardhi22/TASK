import React,{useState} from 'react'

export default function EditStudent({ students, parents, onEdit, onDelete }) {
    const [q, setQ] = useState("");
      const [classFilter, setClassFilter] = useState("");
    
      const classes = Array.from(new Set(students.map((s) => s.className))).filter(Boolean);
    
      const filtered = students.filter((s) => {
        const matchName = s.name.toLowerCase().includes(q.toLowerCase());
        const matchClass = classFilter ? s.className === classFilter : true;
        return matchName && matchClass;
      });
    
      const getParentName = (id) => (parents.find((p) => p.id === id) || {}).name || "-";
  return (
    <div>
      <div className='bg-white flex flex-col  rounded-xl p-4 mr-1.5 '>
      <h2 className='text-xl font-semibold'>Students List </h2>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }} className='flex items-center bg-gray my-4 w-[300px] border-[1px] rounded-md'>
        <input placeholder="Search by student name" value={q} onChange={(e) => setQ(e.target.value)} className='py-1.5 px-1.5 border-0 outline-0'/>
        <select value={classFilter} className=' border-0 outline-0' onChange={(e) => setClassFilter(e.target.value)}>
          <option value="" className=''>All classes</option>
          {classes.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>
      {filtered.length === 0 && <div>No students found.</div>}
      <ul >
        {filtered.map((s) => (
          <li key={s.id} >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong>{s.name}</strong> <small>({s.className})</small>
                <div style={{ fontSize: 12 }}>Parent: {getParentName(s.parentId)}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => onEdit(s)}>Edit</button>
                <button onClick={() => { if (confirm(`Delete student ${s.name}?`)) onDelete(s.id); }} >Delete</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
}
