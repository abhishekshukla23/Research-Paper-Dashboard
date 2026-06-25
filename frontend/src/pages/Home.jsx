import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import PaperCard from '../components/PaperCard';
import { getPapers, getRealPapers } from '../services/papersApi';

const Home = ({setSavedPaps}) => {

  const [lastId,setLastId]=useState(null)

  const [papers,setPapers]=useState([])

  const [loading,setLoading]=useState(true)

const [error,setError]=useState(null)

  useEffect(()=>{
    async function loadPapers() {
      try{
      //const data=await getPapers();
      const data=await getRealPapers();
      console.log(data);
     setPapers(data);
     
      }catch(err){
        setError("failed to load papers")
      }
      finally{
        setLoading(false);
      }
      
    }
    loadPapers();
   
  },[])

  

  useEffect(()=>{
  const recentId=localStorage.getItem("lastRead")
  if(recentId){
    setLastId(recentId)
  }
  },[])

const [text, setText] = useState('');
  const handleChange = (event) => {
    setText(event.target.value)

  };

  const topics = [
   "All",
  "LLM",
  "NLP",
  "Computer Vision",
  "Astrophysics",
  "Cosmology"
  ];
  const [topic, setTopic] = useState("All");
  

  function handleSave(paper){
    setSavedPaps((prev)=>{
      const exists=prev.some(item=>item.id===paper.id);
      const update= exists?prev:[...prev,paper]
      console.log("updates",update);
      return update;
    })
  }


  


  if(error){
    return <h2>{error}</h2>
  }


if(loading){
    console.log("loading",loading);
    return <h2>Loading Papers</h2>
  }




   const lastPaper=papers.find(p=>
          p.id===Number(lastId)
        );

  


 
  const filteredPapers = papers.filter(m => {
    const matchSearch = m.title.toLowerCase().includes(text.toLowerCase())

    const matchTopic = topic === "All" || m.topic.toLowerCase() === topic.toLowerCase();

    return matchSearch && matchTopic;
  }
  )





  return (
    <div>
      <h1>AI Research Dashboard</h1>

      <input type="text" value={text} onChange={handleChange} placeholder='Search Papers..' />





   
    
   
      <div>
        {
       
      
          lastPaper?(
        
        <Link to={`/details/${lastId}`}>

      

       Continue Reading..: {lastPaper.title}

    
        </Link>
          ):(
            <p>No recent Papers</p>
          )
}
        
        </div>

      <div>
        <h2>
          Topics
        </h2>
        <div>
          {
            topics.map((m) =>
              <button key={m} onClick={() => {
                setTopic(m)
              }}
              >
                {m}
              </button>
            )
          }


        </div>





      </div>


      <div>
        Latest Papers


        {
          filteredPapers.map(p => (


           
            
            <PaperCard
              id={p.id}
              key={p.id}
              title={p.title}
              author={p.author}
              topic={p.topic}
              paper={p}
              onSave={handleSave}
              
             
            />
           
          ))
        }




      </div>

      <div><Link to="/saved"> 
      Saved Papers
      </Link></div>
    </div>
  )
}

export default Home
