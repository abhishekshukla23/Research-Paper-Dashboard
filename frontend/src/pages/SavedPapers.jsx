import React from 'react'

const SavedPapers = ({savedPaps,setSavedPaps}) => {
  console.log("saved papers:",savedPaps);

  const handleDel=(idTodel)=>{
   const upd=savedPaps.filter((p)=>p.id!==idTodel
  
  )
   setSavedPaps(upd)
  }
  return (
    <div>SavedPapers


      <div>
       {savedPaps.length>0?(savedPaps.map((paper)=>(
      
      <div key={paper.id}>
        <p>{paper.title}</p>
      <p>{paper.author}</p>
      <p>{paper.topic}</p>


    <button onClick={()=>handleDel(paper.id)}>
      Delete
    </button>
      </div>

       ))
      ):(
        
      <p>No papers found!</p>
      )
    }
      </div>
    </div>

   
  )
}

export default SavedPapers