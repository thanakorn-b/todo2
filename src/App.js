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
    const newList = lists.filter((list) => (list.id !== id));
    setLists(newList);
    // setLists(lists.filter((notNeed, index) => index !== id));
  }
  const editList = (id) => {
    if(input!==''){
      alert('Please clear text on input!!!');
    } else {
    var text = lists.filter((list) => (list.id === id)).map(x=>x.text);
      setInput(text);
      const newList = lists.filter((list) => (list.id !== id));
      setLists(newList);
    }
  }

  return(
    <div>
      {lists.map((list)=>
        <div key={list.id} >
          <div>
            {list.text}
          </div>
          <button onClick={() => editList(list.id)}>Edit</button>
          <button onClick={() => deleteList(list.id)} >X</button>
        </div>
      )}
      <input  value={input} onChange={e => setInput(e.target.value)} id="inputBox"></input>
      <button onClick={add}>Add</button>
    </div>
  )
}

export default App;
