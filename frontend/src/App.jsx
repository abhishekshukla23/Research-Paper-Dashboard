
import './App.css'
import Home from './pages/Home'
import { Router,Routes,Route, BrowserRouter } from 'react-router-dom'
import { useState ,useEffect} from 'react'
import PaperDetails from './pages/PaperDetails'
import SavedPapers from './pages/SavedPapers'










function App() {
  const [savedPaps,setSavedPaps]=useState(()=>{
   const data= localStorage.getItem("savedPapers");
   return data ?JSON.parse(data):[];

  });

console.log(savedPaps)

useEffect(()=>{
    localStorage.setItem("savedPapers",JSON.stringify(savedPaps));
},[savedPaps]);






  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home setSavedPaps={setSavedPaps} />} />
          <Route path="/saved" element={<SavedPapers savedPaps={savedPaps} setSavedPaps={setSavedPaps} />} />
          <Route path="/details/:id" element={<PaperDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
