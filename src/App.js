import React, { useEffect, useState } from 'react';
const shortid = require('shortid');

function App() {
  const [tables, setTables] = useState([
    {number: 0,
    name: 'table1',
    lists: [
      {text: 'a', id: 1},
      {text: 'b', id: 2},
      {text: 'c', id: 3}
      ]
    },
    {number: 2,
      name: 'table2',
      lists: [
        {text: '1', id: 4}
        ]
      },
      {number: 3,
        name: 'table3',
        lists: [
          {text: 'f2s', id: 5}
          ]
        }
  ]);

  const [input, setInput] = useState([
    {number: 0, text: ''},
    {number: 10, text: ''},
    {number: 3, text: ''}
  ]);

  // const test = (tableNumber) => {
  //   const eTable0 = tables.filter((table) => table.number === tableNumber);
  //   const eTable = eTable0[0];
  //   console.log(eTable);
  // }
  // const getInputText = (tableNumber) => {
  //   const eInput0 = input.filter((input) => input.number === tableNumber);
  //   const eInput = eInput0[0];
  //   return eInput.text;
  // }; not use

  const handleOnChange = (event, tableNumber) => { //OK
    for(var i in input){
      if(input[i].number === tableNumber) {
        input[i].text = event.target.value;
        return input[i].text;
        // break;
      };
    }
    setInput(input);  
  };

  const add = (tableNumber) => { //OK
    // const eTable0 = tables.filter((table) => table.number === tableNumber);
    // const eTable = eTable0[0];
    const eInput0 = input.filter((input) => input.number === tableNumber);
    const eInput = eInput0[0];
    if(eInput.text === '') {
      alert('Please input something to add into this table');
    } else {
      var tablesCopy = [...tables];
      for(var i in tablesCopy){
        if(tablesCopy[i].number === tableNumber) {
          tablesCopy[i].lists.push({text: input[i].text, id: shortid.generate()});
        };
      }
    // tablesCopy[eTable.number] = {
    //   ...tablesCopy[eTable.number],
    //   lists: [...tables[eTable.number].lists, {text: input[eTable.number].text, id: shortid.generate()}]
    // };
    setTables(tablesCopy);   
    for(var l in input){
      if(input[l].number === tableNumber) {
        input[l].text = '';
        break;
      };
    }
    document.getElementById(tableNumber).value = '';
    setInput(input);
    }
  };

  const deleteList = (tableNumber, listId) => { //OK
    const tablesCopy = [...tables];
    for(var i in tablesCopy){
      if(tablesCopy[i].number === tableNumber) {
        tablesCopy[i].lists = tablesCopy[i].lists.filter((lists) => lists.id !== listId);
      };
    }
    setTables(tablesCopy);
  };

  const editList = (tableNumber, listId) => {  //OK
    const eTable0 = tables.filter((table) => table.number === tableNumber);
    const eTable = eTable0[0];
    // const eInput0 = input.filter((input) => input.number === tableNumber);
    // const eInput = eInput0[0];
    // console.log(document.getElementById(tableNumber).value)
    if(document.getElementById(tableNumber).value !== '') {
      alert('Please clear text on input!!!');
    } else {
    // var text = tables[eTable.number].lists.filter((lists) => (lists.id === listId)).map(x=>x.text);
    var text = eTable.lists.filter((lists) => (lists.id === listId)).map(x=>x.text);
    var text1 = text.join();
    for(var l in input){
      if(input[l].number === tableNumber) {
        input[l].text = text1;
        break;
      };
    }
    // input[]
    // input[eTable.number].text = text1;
    // setInput(input); // why if delete 3 next line can't render input[tableNumber].text? : finish function with reder??
    // const tablesCopy = [...tables];
    // tablesCopy[eTable.number].lists = tablesCopy[eTable.number].lists.filter((lists) => lists.id !== listId);
    // setTables(tablesCopy);
    const tablesCopy = [...tables];
    for(var i in tablesCopy){
      if(tablesCopy[i].number === tableNumber) {
        tablesCopy[i].lists = tablesCopy[i].lists.filter((lists) => lists.id !== listId);
      };
    }
    setTables(tablesCopy);
    document.getElementById(tableNumber).value = text1;
    setInput(input);
    }
  };
  
  const deleteTable = (tableNumber) => { //OK
    const tablesCopy = [...tables];
    for(var i in tablesCopy){
      if(tablesCopy[i].number === tableNumber) {
        tablesCopy.splice(i, 1);
        input.splice(i, 1);
      };
    }
    setTables(tablesCopy);
    setInput(input);
  };

  // const editTable = () => {

  // // };
  let nextId = 20;
  function generateId() {
  const result = nextId;
  nextId += 1;
  return result;
  }

  const addTable = () => {
    const tablesCopy = [...tables];
    tablesCopy.push({
        number: generateId(),
        name: 'New Table',
        lists: []
        });
    // tables.push({
    //   number: eId,
    //   name: 'New Table',
    //   lists: []
    //   });
    setTables(tablesCopy);
    const inputCopy = [...input];
    inputCopy.push({number: generateId(), text: ''});
    setInput(inputCopy);
    // console.log(x)
    // console.log(tables)
  }

  const renderEverthing = () => {return(
    tables.map((table) => 
      <div key={table.number}>
        {table.name}
        {/* <button onClick={() => test(table.number)}>Edit</button> */}
        <button onClick={() => deleteTable(table.number)} >X</button>
        {table.lists.map((list) => 
          <div key={list.id} >
          <div>
             {list.text}
          </div>
          <button onClick={() => editList(table.number, list.id)}>Edit</button>
          <button onClick={() => deleteList(table.number, list.id)} >X</button>
          </div>
        )}
      <input id={table.number} defaultValue={''} onChange={e => handleOnChange(e, table.number)}></input>
      <button onClick={() => add(table.number)}>Add</button>
      </div>
      )
    )}

  return(
    <div>
      {renderEverthing()}
    <button onClick={addTable}>Add Table</button>
    </div>
  )

};

export default App;