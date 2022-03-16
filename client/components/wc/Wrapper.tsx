import React, { useEffect, useRef } from "react";

export const Wrapper = ({ children }) => {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    ref.current?.attachShadow(children);
  }, []);

  return <span>{children}</span>;
};
