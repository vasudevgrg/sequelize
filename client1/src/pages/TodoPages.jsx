import { useEffect, useState } from 'react'
import Card from '../Components/Card';


function TodoPages() {
  const [title, setTitle]= useState("");
  const [desc, setDesc]= useState("");
  const [file, setFile]= useState();
  const [arr, setArr]= useState([]);

  useEffect(()=>{
    fetch("http://localhost:5000/todos", { method:"get", credentials:"include"}).then(e=>e.json()).then(e=>setArr(e.items)).catch(e=>console.log(e));
  },[]);

  const handleUpload= ()=>{
    const formdata= new FormData();
    formdata.append("title", title);
    formdata.append("description", desc);
    formdata.append("file", file);
    fetch("http://localhost:5000/todos", {
      method:"POST",
      headers:{
        "content-type":"application/json"
      },
      
      body:JSON.stringify({
        title:title,
        description: desc
      }),
      credentials:"include"
      // body:formdata
    }).then(e=>e.json()).then(e=>setArr(ei=>[...ei,e.item])).catch(e=>console.log(e));
  }

  return (
    <>
    <label>Title</label>
    <input onChange={e=>setTitle(e.target.value)}/>
    <label>Description</label>
    <input onChange={e=>setDesc(e.target.value)} />
    <label>upload file</label>
    <input type='file' onChange={e=>setFile(e.target.files[0])}/>
    <button onClick={handleUpload}>Add Item</button>
    {
      
      arr.map(e=>(
        <>
        <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
       <Card title={e.title} description={e.description} todo_id={e.todo_id} setArr={setArr}/></div>
        </>)
      )
    }
    </>
  )
}

export default TodoPages
