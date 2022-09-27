import { useEffect, useState } from 'react';

export const Message = ({
  variant,
  children,
}: {
  variant: 'success' | 'error';
  children: React.ReactNode;
}) => {
  /*!
   * Original code by Rotimi Best from StackOverflow
   *
   * Attribution-ShareAlike 4.0 International Licensed, Copyright (c) 2020 Rotimi Best, see https://creativecommons.org/licenses/by-sa/4.0/ for details
   *
   * Credits to the Rotimi Best team:
   * https://stackoverflow.com/questions/65214950/how-to-disappear-alert-after-5-seconds-in-react-js
   * https://stackoverflow.com/users/8817146/rotimi-best
   */
  const [alert, setAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAlert(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>{alert && <div className={`alert alert-${variant}`}>{children}</div>}</>
  );
};
