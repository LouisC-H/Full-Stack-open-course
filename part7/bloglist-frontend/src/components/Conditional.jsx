import PropTypes from "prop-types";

const Conditional = (props) => {
  // This component renders its children only if the boolean prop is true
  if (props.boolean) {
    return <div>{props.children}</div>;
  }
};

Conditional.propTypes = {
  boolean: PropTypes.bool.isRequired,
};

export default Conditional;
