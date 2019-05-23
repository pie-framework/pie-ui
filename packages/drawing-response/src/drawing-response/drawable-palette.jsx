import React from 'react';
import PropTypes from 'prop-types';
import { InputContainer } from '@pie-lib/config-ui';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withStyles } from '@material-ui/core/styles';

// TODO: Change Palette so will render inputs and colors dynamically
class Palette extends React.Component {
  onChange = (name) => event => {
    const { value } = event.target;
    const { onFillColorChange, onOutlineColorChange, onPaintColorChange } = this.props;

    if (name === 'fill') {
      onFillColorChange(value);
    } else if (name === 'outline') {
      onOutlineColorChange(value)
    } else {
      onPaintColorChange(value)
    }
  };

  render() {
    const { classes, fillColor, outlineColor, paintColor, fillList, outlineList, paintList } = this.props;

    return (
      <div className={classes.base}>
        <InputContainer label="Fill Color" className={classes.input}>
          <Select
            className={classes.select}
            onChange={this.onChange('fill')}
            value={fillColor}
          >
            {fillList.map(fill => (
              <MenuItem
                key={fill}
                value={fill}
                className={classes.item}
                style={{ backgroundColor: fill }}
              >
                {fill}
              </MenuItem>
            ))}
          </Select>
        </InputContainer>

        <InputContainer label="Outline Color" className={classes.input}>
          <Select
            className={classes.select}
            onChange={this.onChange('outline')}
            value={outlineColor}
          >
            {outlineList.map(outline => (
              <MenuItem
                key={outline}
                value={outline}
                className={classes.item}
                style={{ border: `2px solid ${outline}` }}
              >
                {outline}
              </MenuItem>
            ))}
          </Select>
        </InputContainer>

        <InputContainer label="Paint Color" className={classes.input}>
          <Select
            className={classes.select}
            onChange={this.onChange('paint')}
            value={paintColor}
          >
            {paintList.map(paint => (
              <MenuItem
                key={paint}
                value={paint}
                className={classes.item}
                style={{ backgroundColor: paint }}
              >
                {paint}
              </MenuItem>
            ))}
          </Select>
        </InputContainer>
      </div>
    );
  }
}

const styles = theme => ({
  base: {
    marginTop: theme.spacing.unit * 2,
    display: 'flex'
  },
  input: {
    flex: 1,
    width: '90%'
  },
  item: {
    borderRadius: '2px',
    height: '22px',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  },
});

Palette.propTypes = {
  classes: PropTypes.object.isRequired,
  fillColor: PropTypes.string.isRequired,
  fillList: PropTypes.string.isRequired,
  onFillColorChange: PropTypes.func.isRequired,
  onOutlineColorChange: PropTypes.func.isRequired,
  outlineColor: PropTypes.shape([]).isRequired,
  outlineList: PropTypes.shape([]).isRequired
};

export default withStyles(styles)(Palette);
