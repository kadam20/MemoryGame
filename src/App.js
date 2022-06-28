import React, { useState, useEffect } from "react";
import Picture from "./Picture";
import { nanoid } from "nanoid";

function App() {
  let [picture, setPicture] = useState([
    { value: "a", isShown: true, done: false, id: nanoid() },
    { value: "a", isShown: true, done: false, id: nanoid() },
    { value: "b", isShown: true, done: false, id: nanoid() },
    { value: "b", isShown: true, done: false, id: nanoid() },
    { value: "c", isShown: true, done: false, id: nanoid() },
    { value: "c", isShown: true, done: false, id: nanoid() },
    { value: "d", isShown: true, done: false, id: nanoid() },
    { value: "d", isShown: true, done: false, id: nanoid() },
    { value: "e", isShown: true, done: false, id: nanoid() },
    { value: "e", isShown: true, done: false, id: nanoid() },
    { value: "f", isShown: true, done: false, id: nanoid() },
    { value: "f", isShown: true, done: false, id: nanoid() },
    { value: "g", isShown: true, done: false, id: nanoid() },
    { value: "g", isShown: true, done: false, id: nanoid() },
    { value: "h", isShown: true, done: false, id: nanoid() },
    { value: "h", isShown: true, done: false, id: nanoid() },
    { value: "i", isShown: true, done: false, id: nanoid() },
    { value: "i", isShown: true, done: false, id: nanoid() },
    { value: "j", isShown: true, done: false, id: nanoid() },
    { value: "j", isShown: true, done: false, id: nanoid() },
  ]);
  let [counter, setCounter] = useState(0);
  let [attempts, setAttempts] = useState(0);
  let [valueHolder, setvalueHolder] = useState([
    { value: "", id: "" },
    { value: "", id: "" },
  ]);

  function shufflePictures() {
    let dummyArray = picture;
    for (let i = dummyArray.length - 1; i > 0; i--) {
      const randomNumber = Math.floor(Math.random() * (i - 1));
      const temp = dummyArray[i].value;
      dummyArray[i].value = dummyArray[randomNumber].value;
      dummyArray[randomNumber].value = temp;
      dummyArray[i].isShown = false;
      dummyArray[0].isShown = false;
      dummyArray[i].done = false;
      dummyArray[0].done = false;
    }

    setPicture([...dummyArray]);
    setCounter(0);
    setAttempts(0);
  }

  function reveal(id) {
    let dummyHolder = valueHolder;
    let dummy = picture;

    if (counter < 2) {
      for (let i = 0; i < dummy.length; i++) {
        if (dummy[i].id === id) {
          dummy[i].isShown = true;
          dummyHolder[counter].id = dummy[i].id;
          dummyHolder[counter].value = dummy[i].value;
        }
      }
    }

    if (
      counter === 1 &&
      dummyHolder[0].value !== dummyHolder[1].value &&
      dummyHolder[0].id !== dummyHolder[1].id
    ) {
      for (let i = 0; i < dummy.length; i++) {
        if (
          dummy[i].id === dummyHolder[0].id ||
          dummy[i].id === dummyHolder[1].id
        ) {
          setAttempts((preAttempts) => preAttempts + 1);
          setTimeout(() => {
            hideAll();
          }, 1000);
        }
      }
    } else if (
      counter === 1 &&
      dummyHolder[0].value === dummyHolder[1].value &&
      dummyHolder[0].id !== dummyHolder[1].id
    ) {
      for (let i = 0; i < dummy.length; i++) {
        if (
          dummy[i].id === dummyHolder[0].id ||
          dummy[i].id === dummyHolder[1].id
        ) {
          dummy[i].done = true;
          setAttempts((preAttempts) => preAttempts + 1);
        }
      }
    }

    counter < 1 ? setCounter((prevCounter) => prevCounter + 1) : setCounter(0);
    console.log(counter);
    setPicture([...dummy]);
    setvalueHolder([...dummyHolder]);
  }

  function hideAll() {
    let dum = picture;
    for (let i = 0; i < dum.length; i++) {
      if (!dum[i].done) {
        dum[i].isShown = false;
      }
    }
    setPicture(dum);
  }

  return (
    <div className="App">
      <h1>My Memory game App</h1>
      <p>Attempts: {attempts / 2}</p>
      <div className="gamefield">
        {picture.map((item) => (
          <Picture
            letter={item.value}
            isShown={item.isShown}
            done={item.done}
            id={item.id}
            key={item.id}
            reveal={() => reveal(item.id)}
          />
        ))}
      </div>
      <button onClick={shufflePictures}>Shuffle</button>
    </div>
  );
}

export default App;
