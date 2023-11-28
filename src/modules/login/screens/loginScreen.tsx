import axios from "axios";
import { useState } from "react";

import Button from "../../../shared/buttons/button/button";
import SVGLogo from "../../../shared/icons/SVGLogo";
import Input from "../../../shared/inputs/input/input";
import {
  BackgroundImage,
  ContainerLogin,
  ContainerLoginScreen,
  LimitedContainer,
  TitleLogin,
} from "../styles/loginScreen.styles";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);
  const handleLogin = async () => {
    const response = await axios({
      method: "post",
      url: "http://localhost:8080/auth",
      data: {
        email,
        password,
      },
    })
      .then((result) => {
        alert(`Fez login!`);
        return result.data;
      })
      .catch((error) => {
        console.log(`xablau: }`, error);
        alert(`xablau: verifique o console}`);
      });

    console.log("response:", response);
  };

  return (
    <ContainerLoginScreen>
      <ContainerLogin>
        <LimitedContainer>
          <SVGLogo />
          <TitleLogin level={2} type="secondary">
            LOGIN
          </TitleLogin>
          <Input
            title="Usuário"
            margin="16px 0 0 0"
            onChange={handleEmail}
            value={email}
          />
          <Input
            type="password"
            title="Senha"
            margin="16px 0 0 0"
            onChange={handlePassword}
            value={password}
          />
          <Button type="primary" margin="64px 16px" onClick={handleLogin}>
            ENTRAR
          </Button>
        </LimitedContainer>
      </ContainerLogin>
      <BackgroundImage src="./background-login.png" />
    </ContainerLoginScreen>
  );
};

export default LoginScreen;
