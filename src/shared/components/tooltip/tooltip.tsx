import { Tooltip as TooltipAntd } from "antd";

import { ContainerExternal, ContainerToolTip } from "./tooltip.style";

interface TooltipProps {
  children: React.ReactNode;
  tooltip?: React.ReactNode;
  title?: string;
}

const Tooltip = ({ children, tooltip, title }: TooltipProps) => {
  if (title) {
    return <TooltipAntd title={title}>{children}</TooltipAntd>;
  }

  return (
    <ContainerToolTip>
      <ContainerExternal>{tooltip}</ContainerExternal>
      {children}
    </ContainerToolTip>
  );
};

export default Tooltip;
