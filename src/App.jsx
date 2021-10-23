import {useEffect, useState} from "react"
import axios from "axios"
import './App.css';

function App() {

  //buat state

  const [dataUser, setDataUser] = useState([])
  const handeRegister = (e)=>{
    e.preventDefault()

    const fd = new FormData()

    fd.append("email", e.target.email.value)
    fd.append("password", e.target.password.value)
    // fd.append("avatar", e.target.avatar.files[0])
    
    axios("http://localhost:9000/api/user_register",{
      method : "POST",
      headers : {
        "content-type" : "multipart/form-data"
      },
      data : fd
    })
    .then(result=>{
      console.log(result.data.query);
      window.location.reload()
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  
  const registerRead = ()=>{
    axios("http://localhost:9000/api/user_read_all",{
      method : "GET"
    })
    .then((result)=>{
      console.log(result);
      setDataUser(prev => prev = result.data.query)
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  useEffect(()=>{
    registerRead()
  },[])
  return (
    <div className="App">
      <form action="" onSubmit={handeRegister} encType="multipart/form-data">
        <label htmlFor="email">Email</label>
        <input type="text" name="email" id="email"/>

        <label htmlFor="password">password</label>
        <input type="password" name="password" id="password"/>

        {/* <input type="file" name="avatar" id="avatar" /> */}

        <button type="submit"> Register</button>
      </form>
        <h1>Data User</h1>
      <table className="user">
        <thead>
        <tr  className="formUser">
          <th>No.</th>
          <th>Email</th>
          <th>Password</th>
          {/* <th>Photo</th>
          <th>Action</th> */}
        </tr>
        </thead>

        <tbody>
          {dataUser.map((e)=>{
            return(
              <tr>
                <td>{e.id}</td>
                <td>{e.email}</td>
                <td>{e.password}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
