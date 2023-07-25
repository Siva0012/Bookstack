import React, { useState } from 'react'
import axios from 'axios'


function Form () {
    const [formData , setFormData] = useState(
        {
            name : '',
            email : '',
            phone : '',
            password : ''
        }
    )

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            await axios.post('http://localhost:3000/register' , formData)
        }catch(err) {
        }
    }

    const handleChange = (e) =>{
        setFormData(
            {
                ...formData,
                [e.target.name] : e.target.value
            },
            {withCredentials : true}
        )
    }

  return (
    <div>
        <form action="" method='POST' onSubmit={handleSubmit} >
            <label htmlFor="email">email</label>
            <input id='email' name='email' type="text" onChange={handleChange}/>
            <label htmlFor="name">name</label>
            <input id='name' name='name' type="text" onChange={handleChange} />
            <label htmlFor="phone">phone</label>
            <input id='phone' name='phone' type="number" onChange={handleChange} />
            <label htmlFor="password">password</label>
            <input id='password' name='password' type="password" onChange={handleChange} />
            <button type='submit' >Submit</button>
        </form>
    </div>
  )
}

export default Form