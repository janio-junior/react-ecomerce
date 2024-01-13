import styled from "styled-components";

interface ContainerProps {
  width: number;
  margin?: string;
}

export const Container = styled.div<ContainerProps>`
  width: ${(p) => p.width}px;
  ${(p) => (p.margin ? `margin: ${p.margin}` : "")};
`;
