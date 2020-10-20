import React, { FormEvent, useCallback, useState } from "react";

import "../styles/pages/signin.css";
import LogotipoImg from "../images/Logotipo.svg";
import api from "../services/api";
import { Link, useHistory } from "react-router-dom";

const SignIn: React.FC = () => {
  const history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();

      const data = {
        email,
        password,
      };

      try {
        api.post("/session", data);

        history.push("/landing");
      } catch (err) {
        alert("Falha ao logar");
      }
    },
    [email, password]
  );

  return (
    <div className="page-signin">
      <div className="logo-container">
        <img src={LogotipoImg} alt="Happy" />

        <div className="estado-cidade">
          <strong>Porto Velho</strong>
          <span>Rôndonia</span>
        </div>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h2>Fazer login</h2>

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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="options">
            <div>
              <input type="checkbox" id="lembrar" />
              <label htmlFor="lembrar">Lembrar-me</label>
            </div>

            <Link to="/forgot-password">Esqueci minha senha</Link>
          </div>

          <Link className="register" to="/signup">
            Registrar-se
          </Link>

          <button
            className="confirm-button"
            type="submit"
            style={{ opacity: email === "" || password === "" ? 0.5 : "" }}
            disabled={email === "" || password === "" ? true : false}
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
