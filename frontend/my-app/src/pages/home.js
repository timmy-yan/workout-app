import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import Form from "./form";
const Home = ({allItems}) => {
    const {mainItemSelected}=useParams();
    const [selectedItems,setSelectedItems] = useState();
    const [isFormVisible, setIsFormVisible] = useState(false);

    // If the mainItemSelected is null get exercises
    // If the mainItemSelected is not null : replace underscores
    const fetchUrl= `http://localhost:9292/${mainItemSelected?mainItemSelected.replaceAll("_",""):"exercises"}` 
    useEffect(()=>{
        fetch(fetchUrl)
        .then(r=>{
            if(r.ok){
                r.json()
                .then(body=>{console.log(body);setSelectedItems(body)})
            }
        })
        .catch(e=>{console.log(e)})
    },[mainItemSelected])
    function handleDeleteItem(id){
        fetch(`${fetchUrl}/${id}`,
        {method:"DELETE"})
        .then(r=>{
            if(r.ok){
                console.log("Successfully deleted")
                r.json()
                // used useState for function component, 
                // acts similarly to the setState for class components
                // not relying on the get method to update state
                .then(body=>setSelectedItems(prev=>prev.filter(item=>item.id!==body.id)))
            }
        })
    }
    function handleUpdateItem(item,key){
        fetch(`${fetchUrl}/${item.id}`, {
            method:"PATCH",
            headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({...item, [key]:item[key]+1})
        })
        .then(r=>{
            if(r.ok){
                r.json()
                .then(body=>setSelectedItems(prev=>prev.map(prevItem=>prevItem.id===body.id?body: prevItem)))
            }
        })
    }

    function handleAddItem(newItem) {
        setSelectedItems((prevItems) => [...prevItems, newItem]);
      }
      
    return <>
       
              {/* Button to toggle form visibility */}
     
              <button className="buttons" onClick={() => setIsFormVisible(!isFormVisible)}>
  {isFormVisible ? "Cancel" : "Post Exercise"}
</button>
{isFormVisible && (
  <Form
    selectedItems={selectedItems}
    handleAddItem={handleAddItem}
    setIsFormVisible={setIsFormVisible}
  />
)}




        
        <hr/>
        <div className="all-items-main">
            <ul>
                {allItems&& Object.keys(allItems).map((mainItem,ind)=><li key={ind}>
                    <NavLink to={`/${mainItem}`}>{mainItem}</NavLink>
                </li>)}
            </ul>
        </div>
        <div className="item-cards">
            {selectedItems && 
                selectedItems.map((item,ind)=><div className="item-card" key={ind}>
                { Object.keys(item).map((k,ind)=><p key={ind}>{!k.includes("id") && k+" : "+item[k]}</p>)}
                {mainItemSelected!=="workouts"&&<div className="edit-buttons">
                    <button className="edit-button" onClick={()=>{handleUpdateItem(item,"reps")}}>Add REPS</button> 
                    <button className="edit-button" onClick={()=>{handleUpdateItem(item,"sets")}}>Add SETS</button> 
                </div>}
                <button className="delete-button" onClick={()=>{handleDeleteItem(item.id)}}>DELETE</button>
                </div>)
            }
        </div>
    </>
};

export default Home;