import React from "react";
import { useNavigate } from "react-router-dom";

const Redirect = ({ link }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    navigate(link);
  }, [link, navigate]);
};

export default Redirect;
