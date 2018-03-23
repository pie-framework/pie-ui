import React from 'react';
import { PlotPoints, utils } from '@pie-lib/charting';
import PropTypes from 'prop-types';
import Controls from './controls';
import debug from 'debug';

const log = debug('pie-lib:point-intercept:main');

export default class Main extends React.Component {

  static propTypes = {
    session: PropTypes.shape({
      points: PropTypes.arrayOf(PropTypes.shape({
        x: PropTypes.number.isRequired,
        y: PropTypes.number.isRequired
      }))
    }),
    onSessionChange: PropTypes.func
  }

  constructor(props) {
    super(props);
    const points = props.session.points || [];
    this.state = {
      session: { ...props.session, points },
      selection: []
    }
  }

  componentWillReceiveProps(nextProps) {
    const points = nextProps.session.points || [];
    const session = { ...nextProps.session, points };
    this.setState({ session });
  }

  addPoint = (p) => {

    const points = utils.addPoint(this.state.session.points, p);
    const session = { ...this.state.session, points };
    this.setState({ session }, this.callOnSessionChange);
  }

  selectionChange = selection => {
    log('[selectionChange]: ', selection);
    this.setState({ selection });
  }

  callOnSessionChange = () => {
    const { onSessionChange } = this.props;
    if (onSessionChange) {
      onSessionChange(this.state.session);
    }
  }

  deleteSelection = () => {
    const points = utils.removePoints(this.state.session.points, this.state.selection);

    log('[deleteSelection] points: ', points);

    const session = { ...this.state.session, points };
    this.setState({ session, selection: [] }, this.callOnSessionChange());
  }

  movePoint = (from, to) => {
    const points = utils.swapPoint(this.state.session.points, from, to);
    const session = { ...this.state.session, points };
    const selection = utils.swapPoint(this.state.selection, from, to);
    this.setState({ session, selection }, this.callOnSessionChange);
  }

  render() {

    const { model } = this.props;
    const { session, selection } = this.state;


    return (
      <div>
        <Controls
          disabled={!(selection && selection.length > 0)}
          onDeleteClick={this.deleteSelection} />
        <PlotPoints
          width={model.width}
          height={model.height}
          domain={model.domain}
          range={model.range}
          disabled={model.disabled}
          onAddPoint={this.addPoint}
          onSelectionChange={this.selectionChange}
          onMovePoint={this.movePoint}
          points={session.points}
          selection={selection}
        />
      </div>
    );
  }
}