import React from 'react';
import PropTypes from 'prop-types';
import debug from 'debug';
import NumberFormat from 'react-number-format';
import _every from 'lodash/every';

const log = debug('pie-elements:text-entry:input');

const BuildFormat = (opts) => {
  return class extends React.Component {

    render() {
      log('[render] this.props: ', this.props);
      return (
        <NumberFormat
          {...opts}
          {...this.props}
          onValueChange={values => {
            log('[onValueChange]: ', values);
            this.props.onChange({
              target: {
                value: values.value,
              },
            });
          }}
        />
      );
    }
  }
}

const DecimalNegativeSeparator = BuildFormat({
  decimalScale: 2,
  fixedDecimalScale: true,
  thousandSeparator: true,
  allowNegative: true
});

const NotDecimalNegativeSeparator = BuildFormat({
  decimalScale: 0,
  thousandSeparator: true,
  allowNegative: true
});

const NotDecimalNoNegativeSeparator = BuildFormat({
  decimalScale: 0,
  thousandSeparator: true,
  allowNegative: false
});

const NotDecimalNegativeNoSeparator = BuildFormat({
  decimalScale: 0,
  allowNegative: true
});

const NotDecimalNoNegativeNoSeparator = BuildFormat({
  decimalScale: 0,
  allowNegative: false
});

const DecimalNoNegativeNoSeparator = BuildFormat({
  decimalScale: 2,
  fixedDecimalScale: true,
  allowNegative: false
});

const DecimalNoNegativeSeparator = BuildFormat({
  decimalScale: 2,
  fixedDecimalScale: true,
  thousandSeparator: true,
  allowNegative: false
});

const DecimalNegativeNoSeparator = BuildFormat({
  decimalScale: 2,
  fixedDecimalScale: true,
  allowNegative: true
});

function every() {
  return _every(arguments, Boolean);
}

/**
 * It seems like the Mui Input component does not like getting an anonymous class built each time if wants the format component. 
 * Instead we predefine them and return them.
 */
export const getFormatTag = ({ allowDecimal, allowThousandsSeparator, allowNegative, allowIntegersOnly }) => {

  if (allowIntegersOnly) {
    /**
     * This would be preferable: 
     * return BuildFormat({
     *  decimalScale: allowDecimal ? 2 : 0,
     *  fixedDecimalScale: allowDecimal ? true : false,
     *  thousandSeparator: allowSeparator,
     *  allowNegative
     * })
     */
    if (every(allowDecimal, allowThousandsSeparator, allowNegative)) {
      return DecimalNegativeSeparator;
    } else if (every(!allowDecimal, allowThousandsSeparator, allowNegative)) {
      return NotDecimalNegativeSeparator;
    } else if (every(!allowDecimal, !allowThousandsSeparator, allowNegative)) {
      return NotDecimalNegativeNoSeparator;
    } else if (every(!allowDecimal, allowThousandsSeparator, !allowNegative)) {
      return NotDecimalNoNegativeSeparator;
    } else if (every(!allowDecimal, !allowThousandsSeparator, !allowNegative)) {
      return NotDecimalNoNegativeNoSeparator;
    } else if (every(allowDecimal, !allowThousandsSeparator, !allowNegative)) {
      return DecimalNoNegativeNoSeparator;
    } else if (every(allowDecimal, allowThousandsSeparator, !allowNegative)) {
      return DecimalNoNegativeSeparator;
    } else if (every(allowDecimal, !allowThousandsSeparator, allowNegative)) {
      return DecimalNegativeNoSeparator;
    }
  } else {
    return null;
  }
}
