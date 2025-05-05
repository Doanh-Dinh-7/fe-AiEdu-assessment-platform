import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
export const ProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [showProgress, setShowProgress] = useState(
    localStorage.getItem("showProgress") === "true"
  );

  useEffect(() => {
    localStorage.setItem("showProgress", showProgress);
  }, [showProgress]);

  return (
    <ProgressContext.Provider value={{ showProgress, setShowProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};
ProgressProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
