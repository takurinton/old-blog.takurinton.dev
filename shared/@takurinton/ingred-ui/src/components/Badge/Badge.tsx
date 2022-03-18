import * as React from "react";
import * as Styled from "./styled";
import { Theme } from "../../themes";
import { useTheme } from "../../themes/useTheme";

export type BadgeColor =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";

const getColor = (key: BadgeColor, theme: Theme) => {
  switch (key) {
    case "primary":
      return theme.palette.primary.main;
    case "secondary":
      return theme.palette.secondary.main;
    case "success":
      return theme.palette.usecase.success.main;
    case "warning":
      return theme.palette.usecase.warning.main;
    case "danger":
      return theme.palette.usecase.danger.main;
  }
};

export type BadgeProps = React.ComponentPropsWithoutRef<"a" | "span"> & {
  color: BadgeColor;
  type?: Styled.BadgeType;
  fontSize?: string;
  fontWeight?: string;
  component?: "span" | "a";
};

const Badge = React.forwardRef<HTMLSpanElement | HTMLAnchorElement, BadgeProps>(
  (
    {
      color,
      type = "normal",
      component = "span",
      fontSize = "0.65em",
      fontWeight = "bold",
      children,
      ...rest
    },
    ref,
  ) => {
    const theme = useTheme();
    return (
      <Styled.Container
        ref={ref}
        as={component}
        type={type}
        color={theme.palette.colors.white.main}
        backgroundColor={getColor(color, theme)}
        fontSize={fontSize}
        fontWeight={fontWeight}
        {...rest}
      >
        {children}
      </Styled.Container>
    );
  },
);

export default Badge;
