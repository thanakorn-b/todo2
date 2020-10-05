import React, { useEffect, useState } from 'react';
const shortid = require('shortid');


function App() {
  const [lists, setLists] = useState([
    {text: 'a', id: 1},
    {text: 'b', id: 2},
    {text: 'c', id: 3},
    {text: 'd', id: 4},
    {text: 'e', id: 5}])
  const [input, setInput] = useState('')

  

  useEffect(()=>{
    console.log(lists);
  },[lists])

  const add = () => {
    const inputData = {
      text: input,
      id: shortid.generate()
    }
    setLists([...lists, inputData]);   
    setInput('')
  }

  const deleteList = (id) => {
    const newList = lists.filter((line) => (line.id !== id));
    setLists(newList);
    // setLists(lists.filter((notNeed, index) => index !== id));
  }

  return(
    <div>
      {lists.map((list)=>
        <div key={list.id} >
          <div>{list.text}</div>
          <button onClick={() => deleteList(list.id)} >X</button>
        </div>
      )}
      <input  value={input} onChange={e => setInput(e.target.value)}></input>
      <button onClick={add}>Add</button>
    </div>
  )
}

export default App;
