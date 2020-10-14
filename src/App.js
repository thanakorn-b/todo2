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
      },
      {number: 2,
        lists: [
          {text: 'f2s', id: 5}
          ]
        }
  ])
  const [input, setInput] = useState([
    {text: ''},
    {text: ''},
    {text: ''}
  ]);

  const handleOnChange = (event, tableNumber) => {
    const items = [...input];
    items[tableNumber].text = event.target.value;
    setInput(items);
  }

  const add = (tableNumber) => {
    if(input[tableNumber].text === '') {
      alert('Please input something to add into this table')
    } else {
      const tablesCopy = [...tables]
    tablesCopy[tableNumber] = {
      ...tablesCopy[tableNumber],
      lists: [...tables[tableNumber].lists, {text: input[tableNumber].text, id: shortid.generate()}]
    }
    setTables(tablesCopy);   
    input[tableNumber].text = '' 
    setInput(input);
    }
  };

  const deleteList = (tableNumber, listId) => {
    const tablesCopy = [...tables];
    tablesCopy[tableNumber].lists = tablesCopy[tableNumber].lists.filter((lists) => lists.id !== listId);
    setTables(tablesCopy);
  }
  const editList = (tableNumber, listId) => {
    var text = tables[tableNumber].lists.filter((lists) => (lists.id === listId)).map(x=>x.text);
    var text1 = text.join()
    input[tableNumber].text = text1
    setInput(input); // why if delete 3 next line can't render input[tableNumber].text? : finish function with reder??
    const tablesCopy = [...tables];
    tablesCopy[tableNumber].lists = tablesCopy[tableNumber].lists.filter((lists) => lists.id !== listId);
    setTables(tablesCopy);
    // if(input!==''){
    //   alert('Please clear text on input!!!');
    // } else {
    // var text = tables.filter((list) => (list.id === id)).map(x=>x.text);
    //   setInput(text);
    //   const newList = tables.filter((list) => (list.id !== id));
    //   setTables(newList);
    // }
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
            <button onClick={() => editList(table.number, list.id)}>Edit</button>
            <button onClick={() => deleteList(table.number, list.id)} >X</button>
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