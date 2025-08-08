import React, { useState, useEffect } from "react";
import "./Login.css";
import { useMyContext } from "../../Context/MyContext";

function Login() {
  const { toggleLogin, setToggleLogin, setToggleLog } = useMyContext();

  const [toggleRegister, setToggleRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Reset form and message when login modal toggles or register mode changes
  useEffect(() => {
    setFormData({ name: "", email: "", password: "" });
    setMessage("");
    setLoading(false);
  }, [toggleLogin, toggleRegister]);

  if (!toggleLogin) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Sanitize input
    const cleanedEmail = formData.email.trim().toLowerCase();
    const cleanedName = formData.name.trim();

    const endpoint = toggleRegister ? "/register" : "/login";
    const payload = toggleRegister
      ? {
          name: cleanedName,
          email: cleanedEmail,
          password: formData.password,
        }
      : {
          email: cleanedEmail,
          password: formData.password,
        };

    try {
      const response = await fetch(
        `https://ssa-backend-y3ne.onrender.com/api/auth${endpoint}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();
      //console.log("📦 Response from backend:", data);

      if (!response.ok) {
        setMessage(data.message || "Something went wrong.");
      } else {
        const { token, user } = data;

        if (!user || !user.id) {
          console.error("⚠️ User ID not found in response:", user);
          setMessage("User ID missing in response.");
          return;
        }

        // Store data in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("username", user.name || cleanedName);
        localStorage.setItem("userid", user.id);

        setMessage("✅ Success! Redirecting...");
        alert("Logged in successfully!");

        setToggleLog(user.name || cleanedName);
        setToggleLogin(false);

        // Refresh the page or navigate as needed
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (err) {
      console.error("❌ Network or parsing error:", err);
      setMessage("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Login">
      <h2 className="text-2xl text-[#ff6815] text-center font-bold !my-5">
        {toggleRegister ? "Register" : "Login"}
      </h2>

      <i
        className="fa-solid fa-xmark close-btn"
        onClick={() => setToggleLogin(false)}
        aria-label="Close login form"
      ></i>

      <form className="login-form" onSubmit={handleSubmit}>
        {toggleRegister && (
          <input
            type="text"
            name="name"
            className="name"
            placeholder="Name"
            required
            maxLength={20}
            minLength={2}
            value={formData.name}
            onChange={handleChange}
          />
        )}

        <input
          type="email"
          name="email"
          className="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          className="password"
          placeholder="Password"
          required
          minLength={6}
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Please wait..." : toggleRegister ? "Register" : "Login"}
        </button>

        {message && <p className="message">{message}</p>}

        <p className="text-center !mb-5">
          {toggleRegister ? "Already have an account?" : "New?"}{" "}
          <span
            className="text-red-700 cursor-pointer"
            onClick={() => {
              setToggleRegister(!toggleRegister);
              setMessage("");
            }}
          >
            {toggleRegister ? "Login" : "Register"}
          </span>
        </p>
      </form>
    </div>
  );
}

export default Login;
