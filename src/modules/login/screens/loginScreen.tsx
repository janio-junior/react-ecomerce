import {
  BackgroundImage,
  ContainerLogin,
  ContainerLoginScreen,
  LimitedContainer,
  LogoImage,
} from "../styles/loginScreen.styles";

const LoginScreen = () => {
  return (
    <ContainerLoginScreen>
      <ContainerLogin>
        <LimitedContainer>
          <LogoImage src="./logo.png" />
        </LimitedContainer>
      </ContainerLogin>
      <BackgroundImage src="./background-login.png" />
    </ContainerLoginScreen>
  );
};

export default LoginScreen;
