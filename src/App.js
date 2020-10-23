import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
const shortid = require('shortid');

const Title = styled.div`
  background-color: black;
`;

const Container = styled.div`  
  background-color: rgb(137, 188, 211);
  width: 100%;
  height: 100%;
`;

const ButtonAdd = styled.button`
  justify-content: center;
  
`;

const Box = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Table = styled.div`
  text-align: center;
`;

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
    {number: 2, text: ''},
    {number: 3, text: ''}
  ]);

  // const test = (tableNumber) => {
  //   console.log(tables);
  //   console.log(input);
  // }

  const handleOnChange = (event, tableNumber) => { //OK
    for(var i in input){
      if(input[i].number === tableNumber) {
        input[i].text = event.target.value;
        break;
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
    var handleNum = generateId();
    const tablesCopy = [...tables];
    tablesCopy.push({
        number: handleNum,
        name: `New Table ${handleNum}`,
        lists: []
        });
    // tables.push({
    //   number: eId,
    //   name: 'New Table',
    //   lists: []
    //   });
    setTables(tablesCopy);
    const inputCopy = [...input];
    inputCopy.push({number: handleNum, text: ''});
    setInput(inputCopy);
    
  }

  const handleOnChangeTableName = (event, tableNumber) => {
    const tablesCopy = [...tables]
    for(var i in tablesCopy){
      if(tablesCopy[i].number === tableNumber) {
        tablesCopy[i].name = event.target.value;
        break;
      };
    }
    setTables(tablesCopy);  
  };

  const renderEverthing = () => {return(
    tables.map((table) => 
      <Table key={table.number}>
        {table.name}
        <input  defaultValue={table.name} onChange={e => handleOnChangeTableName(e, table.number)} ></input>
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
      </Table>
      )
    )}

  return(
    <Container>
      <Box>
        {renderEverthing()}     
      </Box>
      <ButtonAdd onClick={addTable}>Add Table</ButtonAdd>
    </Container>
  )

};

export default App;