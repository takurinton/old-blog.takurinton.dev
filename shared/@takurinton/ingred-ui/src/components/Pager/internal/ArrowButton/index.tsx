import * as React from "react";

import * as Styled from "./styled";
import Icon from "../../../Icon";
import { useTheme } from "../../../../themes";

type Props = {
  isRight: boolean;
  disabled: boolean;
  onClick: () => void;
};

export const ArrowButton: React.FunctionComponent<Props> = ({
  isRight,
  disabled,
  onClick,
}) => {
  const theme = useTheme();
  return (
    <Styled.ArrowButton disabled={disabled} type="button" onClick={onClick}>
      <Icon
        name={isRight ? "arrow_right" : "arrow_left"}
        size="md"
        color={
          // TODO: disabled props
          disabled ? theme.palette.colors.gray.main : theme.palette.icon.active
        }
      />
    </Styled.ArrowButton>
  );
};
