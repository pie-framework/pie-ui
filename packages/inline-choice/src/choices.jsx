import React from "react";
import PropTypes from 'prop-types';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Input from 'material-ui/Input';

const Choices = ({ value, onChange, items }) => {
  return (
    <Select
      value={value}
      onChange={onChange}
      input={<Input />}>
      {items.map((item, index) => (
        <MenuItem key={index} value={item.value}>
          <span dangerouslySetInnerHTML={{ __html: item.label }}></span>
        </MenuItem>
      ))}
    </Select>
  );
};

Choices.propTypes = {
  items: PropTypes.array.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default Choices;
