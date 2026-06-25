import React from 'react'
import { Link } from 'react-router-dom'
const PaperCard = (props) => {
  return (
    <div>
  <div>
    {props.id}
  </div>
    
    <p>{props.title}</p>

<p>{props.topic}</p>

<p>{props.author}</p>


<div>
  <button onClick={()=>{props.onSave(props.paper);
  console.log("saved")
  }
  }>
      Save
  </button>
</div>
 <Link to={`/details/${props.id}`}>
 Read More
 </Link>

    </div>
  )
}

export default PaperCard