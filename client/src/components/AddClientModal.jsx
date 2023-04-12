import React from "react";
import { FaUser } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_CLIENT } from "../mutations/ClientMutations";
import GET_CLIENTS from "../queries/ClientQuery";


const AddClientModal = () => {

    const [name ,setName] = useState('')
    const [email ,setEmail] = useState('')
    const [phone ,setPhone] = useState('')

    
    const [addClient] = useMutation(ADD_CLIENT ,{
        variables : {name , email ,phone} ,
        // refetchQueries : [{query :GET_CLIENTS }]
        update(cache , {data : {addClient}}){
            const {clients} = cache.readQuery({query : GET_CLIENTS})

            cache.writeQuery({
                query : GET_CLIENTS ,
                data : {
                    clients: [...clients , addClient]
                }
            }) ;
        }
    })   
    

    const handleOnSubmit = (e) => {
        // e.preventDefault()
        
        if(name == '' || email == '' || phone == ''){
            alert('Please enter details')
        }
        else 
        addClient(name ,email ,phone)


        setName('')
        setEmail('')
        setPhone('')
        
    }

    return (
        <>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addClientModal">
            <div className="d-flex align-items-center gap-2 justify-items center p-2">
                <FaUser className="icon" />
                <div>Add Client</div>
            </div>
        </button>

        
        <div className="modal fade" id="addClientModal" tabIndex="-1" aria-labelledby="addClientModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5" id="addClientModalLabel">Modal title</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
                <form onSubmit={handleOnSubmit} >
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Name</label>
                        <input type="text"  id="name" value={name} className="form-control" onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Email</label>
                        <input type="email"  id="email" value = {email}className="form-control" onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Name</label>
                        <input type="number"  id="phone" value={phone} className="form-control" onChange={(e) => setPhone(e.target.value)} />
                    </div>

                    <button className="btn btn-primary data" type="submit" data-bs-dismiss="modal" >Submit</button>
                </form>
            </div>
            
            </div>
        </div>
        </div>
    </>
    )
}
export default AddClientModal