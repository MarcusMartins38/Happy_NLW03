import React, { FormEvent, useCallback, useState } from "react";

import { Link } from "react-router-dom";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { checkIfAlreadyLogged } from "../store/modules/user/actions";
import { motion } from "framer-motion";

import "../styles/pages/signin.css";
import LogotipoImg from "../images/Logotipo.svg";

const SignIn: React.FC = () => {
  const dispatch = useDispatch();

  const [isChecked, setIsChecked] = useState(false);

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
      <motion.div
        initial={{ opacity: 0.5, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="logo-container"
      >
        <img src={LogotipoImg} alt="Happy" />

        <div className="estado-cidade">
          <strong>Porto Velho</strong>
          <span>Rondônia</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0.5, y: -150 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="form-container"
      >
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
              <input
                type="checkbox"
                id="lembrar"
                onChange={() => setIsChecked(!isChecked)}
                checked={isChecked}
                style={{
                  cursor: "pointer",
                  opacity: isChecked ? "0" : "",
                  zIndex: 1,
                }}
              />
              {isChecked && (
                <FiCheck
                  size={24}
                  style={{
                    background: "#37C77F",
                    position: "absolute",
                    borderRadius: "2px",
                  }}
                />
              )}
              <label htmlFor="lembrar" style={{ cursor: "pointer" }}>
                Lembrar-me
              </label>
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
      </motion.div>
    </div>
  );
};

export default SignIn;
