import { useState } from "react";

import Button from "../../../shared/inputs/input/buttons/button/button";
import Input from "../../../shared/inputs/input/input";
import {
  BackgroundImage,
  ContainerLogin,
  ContainerLoginScreen,
  LimitedContainer,
  LogoImage,
  TitleLogin,
} from "../styles/loginScreen.styles";

const LoginScreen = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const handleUserName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setUserName(event.target.value);
  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);
  const handleLogin = () => alert(`Usuário: ${userName}, Senha: ${password}`);

  return (
    <ContainerLoginScreen>
      <ContainerLogin>
        <LimitedContainer>
          <LogoImage src="./logo.png" />
          <TitleLogin level={2} type="secondary">
            LOGIN
          </TitleLogin>
          <Input
            title="Usuário"
            margin="16px 0 0 0"
            onChange={handleUserName}
            value={userName}
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
