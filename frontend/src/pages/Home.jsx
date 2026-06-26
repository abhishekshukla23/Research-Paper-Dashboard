import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom';
import PaperCard from '../components/PaperCard';
import SearchBar from '../components/SearchBar';
import { getPapers, getRealPapers,getSuggestions } from '../services/papersApi';

const Home = ({ setSavedPaps }) => {

  const [lastId, setLastId] = useState(null)

  const [papers, setPapers] = useState([])

  const [loading, setLoading] = useState(true)

  const [error, setError] = useState(null)
  const [text, setText] = useState('');

  const [start,setStart]=useState(0)
  const [hasMore,setHasMore]=useState(false)

const [suggestion,setSuggestion]=useState([])

  async function loadPapers(searchText="artificial intelligence",currentStart=0) {
    try {
      setError(null)
      setLoading(true)
      //const data=await getPapers();
      const data = await getRealPapers(searchText,currentStart);
     if(data.length<10){
setHasMore(false);
     } 
     else{
      setHasMore(true)
     }
      setStart(0)
      setPapers(data);
      console.log("Received:", data);
      console.log("Length:", data.length);

    } catch (err) {
      setError("failed to load papers")
    }
    finally {
      setLoading(false);
    }

  }
  async function loadMore() {
    const nextStart=start+10;
    const more=await getRealPapers(text,nextStart)
    if(more.length<10) {
      setHasMore(false)
    }
    setPapers(prev=>[...prev,...more]);
    setStart(nextStart)
    
  }

async function handleSearch() {
  await loadPapers(text);
}


useEffect(()=>{
 
 const timer= setTimeout(()=>{
   if(text.trim()==="") return topicsQueries[topic];
     else loadPapers(text)
  },500)
  return ()=>(
    clearTimeout(timer)
  )
},[text])

  useEffect(() => {

    loadPapers();

  }, [])



  useEffect(() => {
    const recentId = localStorage.getItem("lastRead")
    if (recentId) {
      setLastId(recentId)
    }
  }, [])

useEffect(()=>{
  if(text.trim()===""){
    setSuggestion([]);
    return ;
  }
  const timer= setTimeout(async ()=>{
    const data=await getSuggestions(text)
    setSuggestion(data)
  },300)
return ()=>clearTimeout(timer)
},[text])
  const handleChange = (event) => {
    setText(event.target.value)

  };

  const topicsQueries = {
    All:"artificial intelligence",
    LLM: "large language model",
  NLP: "natural language processing",
  "Computer Vision": "computer vision",
  Astrophysics: "astrophysics",
  Cosmology: "cosmology",
  };
  const [topic, setTopic] = useState("All");


  function handleSave(paper) {
    setSavedPaps((prev) => {
      const exists = prev.some(item => item.id === paper.id);
      const update = exists ? prev : [...prev, paper]
      console.log("updates", update);
      return update;
    })
  }





  if (error) {
    return <h2>{error}</h2>
  }


  if (loading) {
    console.log("loading", loading);
    return <h2>Loading Papers</h2>
  }




  const lastPaper = papers?.find(p =>
    p.id === Number(lastId)
  );



  if (!Array.isArray(papers)) {
    return <h2>Invalid data received</h2>;
  }

   const filteredPapers = papers 
  // .filter(m => {
  //   // const matchSearch = m.title.toLowerCase().includes(text.toLowerCase())

  //   const matchTopic = topic === "All" || m.topic.toLowerCase() === topic.toLowerCase();

  //   return  matchTopic;
  // }
  // )



  console.log("papers state:", papers);
  console.log("filtered:", filteredPapers);

  return (
    <div>
      <h1>AI Research Dashboard</h1>

    
      <SearchBar
      text={text}
     onChange={handleChange}
      onSearch={handleSearch}
      
      
      
      />



       {
          suggestion.length>0 &&(
               <div>
                {
                  suggestion.map((item,index)=>{
                     return  <p key={index}
                      onClick={()=>{
                        setSuggestion([])
                        setText(item)
                        loadPapers(item)
                      }}
                      >
                        {item}
                      </p>
                  })
                }
               </div>
          )
        }









      <div>
        {


          lastPaper ? (

            <Link to={`/details/${lastId}`}>



              Continue Reading..: {lastPaper.title}


            </Link>
          ) : (
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
            Object.keys(topicsQueries).map((m) =>
              <button key={m} onClick={async () => {
                setTopic(m)
                setText("")
                await loadPapers(topicsQueries[m])
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
   {
    hasMore&&
    (
      <button onClick={loadMore}>
        Load more
      </button>
    )
   }
      
    </div>
  )
}

export default Home
