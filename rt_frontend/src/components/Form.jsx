import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useState } from "react";
import './form.css';

//route - go to when submit the form
//method - registering or login in

export const Form = ({ route, method }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const heading = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, { username, password });
      console.log(res.data);
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="form-container">
    <form onSubmit={handleSubmit} class="form">
      <h1>{heading}</h1>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button type="submit" class="submit-btn"> {heading}</button>
      {
        method == 'login' ? (<p class="link-txt">Don't have account? <a href='/register'>register</a></p>) : (<p class="link-txt">Having an account? <a href='/login'>login</a></p>)
      }
    </form>
    </div>
  );
};
