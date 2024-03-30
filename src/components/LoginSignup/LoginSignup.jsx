import React, { useState, useEffect} from 'react'
import './LoginSignup.css'
import {Tilt} from 'react-tilt'; 
import login_img from '../Assets/img-01.png'

const LoginSignup = () => {
	
	const intialvalues = {name: "", email: "", pass: ""};
	const [formValues, setFormValues] = useState(intialvalues);
	const [formErrors, setFormErrors] = useState({});
	const [isSubmit, setIsSubmit] = useState(false);
	const [action,setAction] = useState("Sign Up");

	const handleChange = (e) => {
		console.log(e.target);
		const {name, value} = e.target;
		setFormValues({ ...formValues, [name]: value});
		console.log(formValues);
	};
	
	useEffect(() => {
		console.log(formErrors)
		if(Object.keys(formErrors).length === 0 && isSubmit){
			console.log(formValues);
		}
	},[formErrors]);
	
	const handleSubmit = (e) => {
		e.preventDefault();
		setFormErrors(validate(formValues));
		setIsSubmit(true);
	};

	const validate = (values) => {
		const errors = {};
		const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
		if(!regex.test(values.email)){
			errors.email = "This is not a valid Email format!";
		}
		if(values.pass.length < 4){
			errors.pass = "Password must be 4 characters!!";
		}
		return errors;
	}; 

  return (
    
    <div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100">
				<Tilt className="login100-pic js-tilt" options={{ scale: 1.1 }}>	
					<img src={login_img} alt="IMG"/>
				</Tilt>
				
				<form className="login100-form validate-form" onSubmit={handleSubmit}>
					<span className="login100-form-title">{action}</span>
                    <div className='underline'></div>

                    {action==="Login"?<div></div>:
					<div className="wrap-input100 validate-input">
						<input className="input100" type="text" name="name" placeholder="Name" value= {formValues.name} onChange={handleChange} required/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-user" aria-hidden="true"></i>
						</span>
						<p>{ formErrors.name}</p>
					</div>
					}
                    
					<div className="wrap-input100 validate-input" >
						<input className="input100" type="text" name="email" placeholder="Email" value={formValues.email} onChange={handleChange} required/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-envelope" aria-hidden="true"></i>
						</span>
					</div>
					<p>{ formErrors.email}</p>
					
					<div className="wrap-input100 validate-input" >
						<input className="input100" type="password" name="pass" placeholder="Password" value={formValues.pass} onChange={handleChange} required/>
						<span className="focus-input100"></span>
						<span className="symbol-input100">
							<i className="fa fa-lock" aria-hidden="true"></i>
						</span>
					</div>
					<p>{ formErrors.pass}</p>
					
					<div className="container-login100-form-btn">
						<button className={action=="Sign Up"? "login100-form-btn gray": "login100-form-btn"} onClick={() => {setAction("Login")}}>
							Login
						</button>
                        <button className={action=="Login"? "login100-form-btn gray": "login100-form-btn"} onClick={() => {setAction("Sign Up")}}>
							Signup
						</button>
					</div>
                   
				    {action==="Sign Up"?<div></div>:
					<div className="text-center p-t-12">
						<span className="txt1">
							Forgot &nbsp;
						</span>
						<a className="txt2" href="#">
                         Username / Password?
						</a>
					</div>
					}
					<br></br>
					{Object.keys(formErrors).length === 0 && isSubmit ? (<div className='ui message success'>{action} Successfully!</div>) : (<h4></h4>)}
				</form>
			</div>
		</div>
	</div>
  )
}

export default LoginSignup

