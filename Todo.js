import React, { useEffect, useState } from "react";
import "./style.css";
import todo from "./images/todo1.png";
//get the lcal storage data back

const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState("");

  const [items, setItems] = useState(getLocalData());

  const [editData, setEditData] = useState(" ");

  const [toggelButton, setToggleButton] = useState(false);

  //add the itmes function
  const addItems = () => {
    if (!inputData) {
      alert("plz fill the Data");
    } else if (inputData && toggelButton) {
      setItems(
        items.map((curElem) => {
          if (curElem.id === editData) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );
      setInputData("");
      setEditData(null);
      setToggleButton(false);
    } else {
      // ...items, this is called spread opreator and
      // means the data set before current data, reamin in array
      const myNewInput = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInput]);
      setInputData("");
    }
  };
  //edit items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setEditData(index);
    setToggleButton(true);
  };
  //how to delete itms
  const deleteItem = (index) => {
    const updatedItems = items.filter((curElem) => {
      return curElem.id !== index;
    });
    setItems(updatedItems);
  };
  //adding date
  const todayDates = () => {
    let today = new Date();

    let options = {
      weekday: "long",
      day: "numeric",
      month: "long",
    };

    return today.toLocaleDateString("en-IN", options);
  };

  //remove all
  const removeAll = () => {
    setItems([]);
  };

  //use local storage using useEffect

  useEffect(() => {
    // items is arraybut we need string here so used Json.strigify
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <div>
      <div className="main-div">
        <div className="child-div">
          <h1>{todayDates()}</h1>
          <figure>
            <img src={todo} alt="todologo" />

            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="Add Item"
              className="form-control"
              value={inputData}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggelButton ? (
              <i className="far fa-edit add-btn" onClick={addItems}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={addItems}></i>
            )}
            ;{/* show items */}
            <div className="showItmes">
              {items.map((curElem) => {
                return (
                  <div className="eachItem" key={curElem.id}>
                    <h2>{curElem.name}</h2>
                    <div className="todo-btn">
                      <i
                        className="far fa-edit add-btn"
                        onClick={() => editItem(curElem.id)}
                      ></i>
                      <i
                        className="far fa-trash-alt add-btn"
                        onClick={() => deleteItem(curElem.id)}
                      ></i>
                    </div>
                  </div>
                );
              })}
              ;
            </div>
          </div>

          {/* remove all button */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>Check List</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
