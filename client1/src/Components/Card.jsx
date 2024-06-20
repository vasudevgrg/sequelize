import React, { useEffect, useState } from 'react'

const Card = ({todo_id, title, description, setArr}) => {
    const [url, setUrl]= useState("");
console.log(todo_id);
    // useEffect(()=>{
    //     fetch(`http://localhost:5000/todos/${todo_id}`).then(e=>e.json()).then(e=>{console.log(e.filename.filename);
    //         setUrl(e.filename.filename);
    //         });
    // },[]);
    const handleDelete=()=>{
        fetch(`http://localhost:5000/todos/delete/${todo_id}`, {
            method:"delete",
            headers:{
                "content-type":"application/json"
            }
        }).then(e=>e.json()).then(e=>{console.log(e); setArr(e.arr)});
    }
  return (
<>
    <div style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
    {/* <img src={'http://localhost:5000/image/'+url} style={{height:"200px", width:"200px"}}/> */}
     <h2>{title}</h2>
     <h3>{description}</h3>
     <button>Edit</button>
     <button onClick={handleDelete}>delete</button>
     </div>
    </>
  )
}

export default Card;