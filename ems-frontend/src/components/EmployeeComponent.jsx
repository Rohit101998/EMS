import React, {useEffect, useState} from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {
    
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    const { id } = useParams();

    const [error, setError ] = useState({
        firstName: '',
        lastName: '',
        email:''
    })

    const navigator = useNavigate();

    useEffect(() => {

        if(id){
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setEmail(response.data.email);
            }).catch(error => {
                console.error("Error fetching employee data:", error);
            });

        }
    }, [id])


    function saveOrUpdateEmployee(e){
        e.preventDefault();

        if(validateForm()){
            const employee = {firstName, lastName, email}
            console.log(employee)

            if(id){

                updateEmployee(id, employee).then((response) => {
                    console.log("Employee updated successfully", response.data);    
                    navigator('/employees');
                }).catch(error => {
                    console.error("Error updating employee data:", error);
                });
            }else{
               createEmployee(employee).then((responce) => {
                console.log("Employee created successfully", responce.data);
                 navigator('/employees');        
           }).catch(error => {
                console.error("Error creating employee data:", error);
           });

            }
        }
    }

        function validateForm() {
            let valid =true;

            const errorCopy = {... error};

            if(firstName.trim()){
                errorCopy.firstName = '';
            }else{
                errorCopy.firstName = 'first name is required';
                valid = false;
            }

           if(lastName.trim()){
              errorCopy.lastName = '';
            }else{
              errorCopy.lastName = 'last name is required';
              valid = false;
           }


            if(email.trim()){
                errorCopy.email = '';
            }else{
                errorCopy.email = 'email is required';
                valid = false;
            }

            setError(errorCopy);
            return valid;
        

    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        }else{
            return <h2 className='text-center'>Add Employee</h2>
        }

    }


  return (
    <div className='container'>
        <br></br>
        <div className='row'>
            <div className='card'>
               {
                pageTitle()
               }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-lable'> Employee First Name:</label>
                            <input 
                                type="text" 
                                placeholder='Enter First Name' 
                                name='firstName' 
                                className={`form-control ${error.firstName ? 'is-invalid' : ''}`}
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                ></input>

                            {error.firstName && <div className='invalid-feedback'>{error.firstName}</div>}

                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-lable'> Employee Last Name:</label>
                            <input 
                                type="text" 
                                placeholder='Enter last Name' 
                                name='lastName' 
                               className={`form-control ${error.lastName ? 'is-invalid' : ''}`}
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                ></input>

                            {error.lastName && <div className='invalid-feedback'>{error.lastName}</div>}

                        </div>

                       < div className='form-group mb-2'>
                            <label className='form-lable'> Employee Email:</label>
                            <input 
                                type="text"  // fixed extra space
                                placeholder='Enter Email' 
                                name='email' 
                                className={`form-control ${error.email ? 'is-invalid' : ''}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value )}
                            />


                            {error.email && <div className='invalid-feedback'>{error.email}</div>}

                        </div>

                        <button className='btn btn-success' type='submit' onClick={saveOrUpdateEmployee}>Save</button>

                    </form>
                </div>

            </div>

        </div>
    </div>
  )
}

export default EmployeeComponent