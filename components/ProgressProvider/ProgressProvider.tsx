import { ProgressProviderProps } from "propTypes/libsProps";
import React, { useEffect } from "react";

export const ProgressProvider = ({
  valueStart,
  valueEnd,
  children,
}: ProgressProviderProps) => {
  const [value, setValue] = React.useState(valueStart);

  useEffect(() => {
    setValue(valueEnd);
  }, [valueEnd]);

  return children(value);
};
