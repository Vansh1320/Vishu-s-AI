import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Background from "./components/Background";
import Home from "./pages/Home";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
	return (
		<BrowserRouter>
			<div className="relative min-h-screen overflow-hidden text-slate-200 dark:text-white bg-[#0a0a0a]">
				<Background />
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/features" element={<Features />} />
					<Route path="/about" element={<About />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/login" element={<Login />} />
					<Route path="/signup" element={<Signup />} />
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;
