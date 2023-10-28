		import { useRef } from "react";
		import { FaBars, FaTimes } from "react-icons/fa";
		import "./NavBar.css";
		import { Link } from "react-router-dom";
		import logo from "../images/logo.png";

		function NavBar() {
			const navRef = useRef();

			const showNavbar = () => {
				navRef.current.classList.toggle(
					"responsive_nav"
				);
			};

			return (
				<div className="navbarm">
				<header className="headernav">
					<img src={logo} fluid></img>
					<nav ref={navRef} className="navm">
						<Link to="/">Home</Link>
						<Link to="/aboutus">About us</Link>
						<Link to="/Lecturer">Our Lecturers</Link>
						<Link to="/timetable">TimeTables</Link>
						<Link to="/contactus">Contact us</Link>
						<button
							className="nav-btn nav-close-btn"
							onClick={showNavbar}>
							<FaTimes />
						</button>
					</nav>
					<button
						className="nav-btn"
						onClick={showNavbar}>
						<FaBars />
					</button>
				</header>
				</div>
			);
		}

		export default NavBar;