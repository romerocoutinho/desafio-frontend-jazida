import styled from "styled-components";
import PropTypes from "prop-types";

const CardStyle = styled.div`
  border: 1px solid #d0d7de;
  border-radius: 5px;
  margin-bottom: 1.4rem;
`;

const Card = ({ children }) => {
  return <CardStyle>{children}</CardStyle>;
};

Card.propTypes = {
  children: PropTypes.node,
};

export default Card;
