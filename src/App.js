import React, { useEffect, useState } from 'react';
const shortid = require('shortid');


function App() {
  const [tables, setTables] = useState([
    {number: 0,
    lists: [
      {text: 'a', id: 1},
      {text: 'b', id: 2},
      {text: 'c', id: 3}
      ]
    },
    {number: 1,
      lists: [
        {text: '1', id: 4}
        ]
      }
  ])
  const [input, setInput] = useState([
    {text: ''},
    {text: ''}
  ]);
  const [initInput, setInitInput] = useState([
    {text: ''},
    {text: ''}
  ]);

  useEffect(()=>{
    console.log(tables);
  },[tables]);

  const handleOnChange = (event, tableNumber) => {
    const items = [...input];
    items[tableNumber].text = event.target.value;
    setInput(items);
  }

  const add = (tableNumber) => {
    const tablesCopy = [...tables]
    tablesCopy[tableNumber] = {
      ...tablesCopy[tableNumber],
      lists: [...tables[tableNumber].lists, {text: input[tableNumber].text, id: shortid.generate()}]
    }
    setTables(tablesCopy);   
    setInput(initInput);
    // const inputData = {
    //   text: input,
    //   id: shortid.generate()
    // }
    // setTables([...tables, inputData]);   
    // setInput('');
  };

  const deleteList = (id) => {
    const newList = tables.filter((lists) => (lists.id !== id));
    setTables(newList);
    // setTables(tables.filter((notNeed, index) => index !== id));
  }
  const editList = (id) => {
    if(input!==''){
      alert('Please clear text on input!!!');
    } else {
    var text = tables.filter((list) => (list.id === id)).map(x=>x.text);
      setInput(text);
      const newList = tables.filter((list) => (list.id !== id));
      setTables(newList);
    }
  }

  return(
    <div>
      {tables.map((table) => 
        <div key={table.number}>
          {table.number}
          {table.lists.map((list) => 
            <div key={list.id} >
            <div>
               {list.text}
            </div>
            <button onClick={() => editList(list.id)}>Edit</button>
            <button onClick={() => deleteList(list.id)} >X</button>
            </div>
          )}
        <input key={table.number} value={input[table.number].text} onChange={e => handleOnChange(e, table.number)}></input>
        <button onClick={() => add(table.number)}>Add</button>
        </div>
      )}
    </div>
  )
}

export default App;