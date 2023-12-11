import styled from "styled-components";

export const ContainerToolTip = styled.div`
  position: relative;
`;

export const ContainerExternal = styled.div`
  display: none;
  position: absolute;
  bottom: -36px;
  left: 20px;
  padding: 4px;
  border-radius: 4px;
  background: rgba(0, 0, 0, 0.4);
  z-index: 10;

  ${ContainerToolTip}:hover & {
    display: block;
  }
`;
