import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../login.css'
import { register } from '../../api/endpoints';



const Register = () => {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

	const navigate = useNavigate();
	const nav = useNavigate();

	const handleNav =() => {
		nav('/login')
	}

	const handleRegister = async (e) => {
	
		e.preventDefault();
		const response = await register(username, password,email);
		if (response === "success") {
            alert("User registered successfully!");
            navigate("/login"); // Navigate to the login page
        } else {
            alert("Registration failed. Please try again.");
        }
		
	};

	return (
		<>

			<div className="container">
				<div className="screen">
					<div className="screen__content">
						<form className="login">
							<div className="login__field">
								<i className="login__icon fas fa-user"></i>
								<input onChange={(e) => setUsername(e.target.value)} type="text" className="login__input" placeholder="User name" />
							</div>
							<div className="login__field">
								<i className="login__icon fas fa-lock"></i>
								<input onChange={(e) => setPassword(e.target.value)} type="password" className="login__input" placeholder="Password" />
							</div>
                            <div className="login__field">
							<i className="login__icon fas fa-envelope"></i>
								<input onChange={(e) => setEmail(e.target.value)} type="email" className="login__input" placeholder="Email" />
							</div>

							

							<button onClick={handleRegister} className="button login__submit">
								<span className="button__text">Sign_up</span>
								<i className="button__icon fas fa-chevron-right"></i>
							</button>

							<p className="link login__link" onClick={handleNav}>
   									 already have an account ? sign_in
							</p>
						</form>
						
					</div>
					<div className="screen__background">
						<span className="screen__background__shape screen__background__shape4"></span>
						<span className="screen__background__shape screen__background__shape3"></span>
						<span className="screen__background__shape screen__background__shape2"></span>
						<span className="screen__background__shape screen__background__shape1"></span>
					</div>
				</div>
			</div>



		</>
	)

}

export default Register;