import { useState } from "react";

import Button from "../../../shared/components/buttons/button/button";
import SVGLogo from "../../../shared/components/icons/SVGLogo";
import Input from "../../../shared/components/inputs/input/input";
import { useRequests } from "../../../shared/hooks/useRequest";
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

  const { authRequest, loading } = useRequests();

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(event.target.value);

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(event.target.value);

  const handleLogin = () => {
    authRequest({ email, password });
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
          <Button
            loading={loading}
            type="primary"
            margin="64px 16px"
            onClick={handleLogin}
          >
            ENTRAR
          </Button>
        </LimitedContainer>
      </ContainerLogin>
      <BackgroundImage src="./background-login.png" />
    </ContainerLoginScreen>
  );
};

export default LoginScreen;
