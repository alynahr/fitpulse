import Hero from "./Hero";
import './App.css';
import { auth } from './firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

function App() {
  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in:", userCredential.user);
    } catch (error) {
      console.error("Login error:", error.message);
    }
  };

  return <Hero />;
}
//mac feature test
export default App;