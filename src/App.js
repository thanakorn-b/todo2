import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
const shortid = require('shortid');

const Title = styled.div`
  background-color: black;
  color: white;
  text-align: center;
  padding: 10px 0px;
  font-size: 30px;
`;

const AddList = styled.div`
  
`;

const Center = styled.div`
  display: flex;
  justify-content: center;
`;

const TitleTable = styled.input`
  text-align: center;
  font-size: 20px;
  border: none;
  background-color: transparent;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  appearance: none;
  margin-bottom: 15px;
  display: inline;
`;

const ButtonRed = styled.button`
  background-color: #ff6a6a;
`;

const Button = styled.button`
  background-color: #63d7fd;
`;

const List = styled.div`
  justify-content: space-between;
  display: flex;
  margin-bottom: 8px;
`;

const Container = styled.div`  
  background-color: rgb(137, 188, 211);
  width: 100%;
  height: 100vh;
  margin: 0px;
`;

const ButtonAdd = styled.button`
  background-color: #63d7fd;
  font-size: 20px;
  margin: 30px 0px;
  width: 130px;
  justify-content: center;
`;

const Box = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Table = styled.div`
  background-color: wheat;
  text-align: center;
  margin: 30px 10px;
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
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

  const addTable = () => {
    var num = 0;
    for(var i in tables){
      if(tables[i].number > num){
        num = tables[i].number
      }
    }
    num = num+1
    const tablesCopy = [...tables];
    tablesCopy.push({
        number: num,
        name: `New Table ${num}`,
        lists: []
        });
    setTables(tablesCopy);
    const inputCopy = [...input];
    inputCopy.push({number: num, text: ''});
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
        <div>
         {/* {table.name} */}
          <TitleTable defaultValue={table.name} onChange={e => handleOnChangeTableName(e, table.number)} ></TitleTable>
          {/* <button onClick={() => test(table.number)}>Edit</button> */}
          <ButtonRed onClick={() => deleteTable(table.number)} >X</ButtonRed>
        </div>
        {table.lists.map((list) => 
          <List key={list.id} >          
            <div>
              • {list.text}
            </div>
            <div>
              <Button onClick={() => editList(table.number, list.id)}>Edit</Button>
              <ButtonRed onClick={() => deleteList(table.number, list.id)} >X</ButtonRed>
            </div>
          </List>
        )}
        <AddList>
          <input id={table.number} defaultValue={''} onChange={e => handleOnChange(e, table.number)}></input>
          <Button onClick={() => add(table.number)}>Add</Button>
        </AddList>
      </Table>
      )
    )}

  return(
    <Container>
      <Title>To-Do List</Title>
      <Box>
        {renderEverthing()}     
      </Box>
      <Center>
        <ButtonAdd onClick={addTable}>Add Table</ButtonAdd>
      </Center>
    </Container>
  )

};

export default App;