import React, { useState } from "react";


function Form({handleAddItem, setIsFormVisible}) {
  const [newName, setName] = useState('');
  const [newMuscle, setMuscle] = useState('');
  const [newReps, setReps] = useState('');
  const [newSets, setSets] = useState('');

  function handlePost(e) {
    e.preventDefault();
    alert("Your Post will Reflect on the EXERCISE Section");
    fetch("http://localhost:9292/exercises", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${newName}`,
        muscle: `${newMuscle}`,
        reps: `${newReps}`,
        sets: `${newSets}`,
        workout_id: "Admin.id",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        handleAddItem(data);
        setIsFormVisible(false);
      });
  
    setName("");
    setMuscle("");
    setReps("");
    setSets("");
  }
  

  return (
    <>
   
        <div>
     <div class="form-container">
        <form action="#" id="form">
          <h1>Want to Add an Exercise?</h1>
          <input type="text" name="subject" id="subject" placeholder="Name of the Exercise" onChange={(e) => setName(e.target.value)}
        value = {newName}/>
          <input type="text" placeholder=" New Muscle" id="name" onChange={(e) => setMuscle(e.target.value)}
           value = {newMuscle}/>

          <input type="number" name="Company URL" id="text" placeholder="Reps " onChange={(e) => setReps(e.target.value)}
         value = {newReps}/>
          <input type="number" name="subject" id="subject" placeholder="Sets" onChange={(e) => setSets(e.target.value)}
        value = {newSets}/>
          <button className="button1" type="submit" id="submitButton" onClick={handlePost}>POST EXERCISE</button>
        </form>
      </div>

    </div>
    
   
   
    </>
    
  )
}

export default Form