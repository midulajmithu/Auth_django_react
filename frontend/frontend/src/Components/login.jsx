
import './login.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/endpoints';


const Login = () => {

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')

	const navigate = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		const response = await login(username, password);
		if (response.success) {

			localStorage.setItem('userRole', response.role); // Store the role
			localStorage.setItem('isAuthenticated', true); // Store authentication state

			setTimeout(() => {

			if (response.role === 'admin') {
				navigate('/admin'); // Redirect to admin dashboard
			} else if (response.role === 'moderator') {
				navigate('/moderator'); // Redirect to moderator page
			} else {
				navigate('/user'); // Redirect to user dashboard
			}
		}, 100);

		} else {
			alert('Invalid username or password'); // Show error to user
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
								<input onChange={(e) => setUsername(e.target.value)} type="text" className="login__input" placeholder="User name / Email" />
							</div>
							<div className="login__field">
								<i className="login__icon fas fa-lock"></i>
								<input onChange={(e) => setPassword(e.target.value)} type="password" className="login__input" placeholder="Password" />
							</div>
							<button onClick={handleLogin} className="button login__submit">
								<span className="button__text">Log In Now</span>
								<i className="button__icon fas fa-chevron-right"></i>
							</button>
						</form>
						<div className="social-login">
							<h3>log in via</h3>
							<div className="social-icons">
								<a href="#" className="social-login__icon fab fa-instagram"></a>
								<a href="#" className="social-login__icon fab fa-facebook"></a>
								<a href="#" className="social-login__icon fab fa-twitter"></a>
							</div>
						</div>
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

export default Login;