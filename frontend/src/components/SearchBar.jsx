import React from 'react'

const searchBar = ({text,onChange,onSearch}) => {
  return (
    <div>
   
     <input type="text" value={text} onChange={onChange} onKeyDown={(e)=>{
        if(e.key=="Enter"){
          onSearch();
        }
      }} placeholder='Search Papers..' 
      
      
      />
 <button onClick={onSearch}>
    Search
 </button>

    
    </div>
  )
}

export default searchBar