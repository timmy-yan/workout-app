import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState, useEffect } from "react"
import Navbar from "./components/navbar/navbar"
import Edit from "./pages/edit"
import Home from "./pages/home"
import Workout from "./pages/workout"
import './App.css';
import Form from "./pages/form"

function App() {
  const [allItems, setAllItems] = useState();
    useEffect(()=>{
        fetch("http://localhost:9292/")
        .then(r=>{
            if(r.ok){
                r.json()
                .then(body=>{console.log(body);setAllItems(body)})
            }
        })
        .catch(e=>{console.log(e)})
    },[])
  return (
    <Router>
      <Navbar />
      <hr/>
      <Routes>
        <Route path="/" exact element={<Home allItems={allItems}/>}/>
        <Route path="/workout" element={<Workout/>}/>
        <Route path="/edit" element={<Edit/>}/>
        <Route path="/:mainItemSelected" element={<Home allItems={allItems}/>}/>
        <Route path="/form" element = {<Form/>}/>
      </Routes>
    </Router>
  );
}

export default App;
