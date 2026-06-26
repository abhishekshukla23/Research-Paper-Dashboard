import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { getPapersById } from '../services/papersApi';
import { setLogLevel } from 'firebase/app';
import { useLocation } from 'react-router-dom';

  

const PaperDetails = ({savedPaps}) => {


    const {id}=useParams();
    

 const location=useLocation();
 const pape=location?.state?.paper

if(!pape){
     return <h2>Paper not found</h2>
     }


useEffect(()=>{
    if(id){
    localStorage.setItem("lastRead",id);
    }
},[id])

const [paper,setPaper] =useState(null)
const [loading,setLoading]=useState(true)
const [error,setError]=useState(null)

useEffect(()=>{
    async function loadPapersId() {
        try{
            const data=await getPapersById(id);
             setPaper(data)


            
        }catch(err){
             setError("failed to show paper")
        }
        finally{
       setLoading(false)
        }
    }
    loadPapersId();
},[id])


if(error){
    return <h3>{error}</h3>
}
if(loading){
    return <h3>Loading.</h3>
}



if(!paper){
    return(
        <div>
            <h3>Paper Not Found!</h3>
        </div>
        
    );
}

return(
    <div>
       <p>{paper.title}</p> 
       <p>{paper.author}</p>
       <p>{paper.topic}</p>
       <p>{paper.year}</p>
       <p>{paper.abstract}</p>
        <a href={paper.pdfUrl} target='_blank'>
        Read Paper
    </a>

    </div>
   


)
}

export default PaperDetails