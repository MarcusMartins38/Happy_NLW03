import React, { FormEvent, useCallback, useState } from "react";

import "../styles/pages/signup.css";
import LogotipoImg from "../images/Logotipo.svg";
import api from "../services/api";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

const SignUp: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const data = {
        name,
        email,
        password,
      };

      try {
        api.post("/user", data);

        history.push("/signin");
      } catch (err) {
        alert("Falha ao registrar-se");
      }
    },
    [email, password]
  );

  return (
    <div className="page-signup">
      <div className="form-container">
        <Link className="goback-button" type="button" to="/signin">
          <FiArrowLeft size={24} color="#12afcb" />
        </Link>

        <form onSubmit={handleSubmit}>
          <h2>Registrar-se</h2>

          <div className="input-block">
            <label htmlFor="name">Nome</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="password">Senha</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="confirm-button"
            type="submit"
            style={{
              opacity:
                name === "" || email === "" || password === "" ? 0.5 : "",
            }}
            disabled={
              name === "" || email === "" || password === "" ? true : false
            }
          >
            Registrar-se
          </button>
        </form>
      </div>

      <div className="logo-container">
        <img src={LogotipoImg} alt="Happy" />

        <div className="estado-cidade">
          <strong>Porto Velho</strong>
          <span>Rondônia</span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
