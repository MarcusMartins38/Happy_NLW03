import React, { FormEvent, useCallback, useState } from "react";

import "../styles/pages/signin.css";
import LogotipoImg from "../images/Logotipo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { checkIfAlreadyLogged } from "../store/modules/user/actions";

const SignIn: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const data = {
        email,
        password,
      };

      dispatch(checkIfAlreadyLogged(data));
    },
    [email, password]
  );

  return (
    <div className="page-signin">
      <div className="logo-container">
        <img src={LogotipoImg} alt="Happy" />

        <div className="estado-cidade">
          <strong>Porto Velho</strong>
          <span>Rondônia</span>
        </div>
      </div>

      <div className="form-container">
        <Link className="goback-button" type="button" to="/">
          <FiArrowLeft size={24} color="#12afcb" />
        </Link>

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
              type="password"
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
