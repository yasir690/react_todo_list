
import React, { useEffect, useState } from 'react'
import './App.css'
const App = () => {

   const getlocalstorage=()=>{
    const list=localStorage.getItem("item");
    if(list){
      return JSON.parse(localStorage.getItem("item"));
    }
    return []
  }

  const [input,setinput]=useState('');
  const [item,setitem]=useState(getlocalstorage());
  const [toggle,settoggle]=useState(true); 
  const [edit,isedit]=useState(null);


  //add item

  const additem=()=>{
    if(!input){
      alert('please add some item')
    }
    else if(input && !toggle){
      setitem(
        item.map((elem)=>{
          if(elem.id==edit){
      return {...elem,name:input};
}
return elem;
        })
      )
      setinput('');
      settoggle(true);
    }
    else{
      const inputdata={id:new Date().getTime().toString(),name:input};
      setitem([...item,inputdata]);
      setinput('');
    }
  }


//edit item

const edititem=(id)=>{

  const finddata=item.find((elem)=>elem.id ==id);
  settoggle(false);
  setinput(finddata.name);
  isedit(id);


}

//delete item

const deleteitem=(id)=>{

  const deletedata=item.filter((elem)=>{
    return elem.id != id;
  })
  setitem(deletedata);
}

//delete all

const deleteall=()=>{
setitem([]);
}


  useEffect(()=>{

    localStorage.setItem('item',JSON.stringify(item));
  },[item]);

  return (
    <div>
      <h1 className='head'>Todo App</h1>
      <hr className='hr'/>
      <div className='main'>
       <input type='text' value={input} onChange={(e)=>setinput(e.target.value)}/>

      {
        toggle ? <button onClick={()=>additem()} className='addbtn'>add item</button>:
        <button onClick={()=>additem()} className='addbtn'>edit item</button>
      }
       <div>
   
       {
        item.map((elem)=>{
          return (
            <div key={elem.id}>
              {elem.name}
              <button onClick={()=>edititem(elem.id)} className='addbtn'>edit item</button>
              <button onClick={()=>deleteitem(elem.id)} className='addbtn'>delete  item</button>
              </div>
          )
        })
       }

       </div>
       
       {item.length >0 && <hr className='hrs'/>}
       {item.length >0 && <button onClick={()=>deleteall()} className='addbtn'>deleteall</button>}
      </div>
    </div>
  )
}

export default App