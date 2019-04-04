import { HorizontalTiler, VerticalTiler } from './tiler';
import { buildState, reducer } from './ordering';
import { Feedback } from '@pie-lib/render-ui';
import CorrectAnswerToggle from '@pie-lib/correct-answer-toggle';
import PropTypes from 'prop-types';
import React from 'react';
import cloneDeep from 'lodash/cloneDeep';
import compact from 'lodash/compact';
import debug from 'debug';
import isEmpty from 'lodash/isEmpty';
import uniqueId from 'lodash/uniqueId';
import { withStyles } from '@material-ui/core/styles';

const log = debug('pie-elements:placement-ordering');

export class PlacementOrdering extends React.Component {
  static propTypes = {
    onSessionChange: PropTypes.func.isRequired,
    model: PropTypes.object.isRequired,
    session: PropTypes.oneOfType([
      PropTypes.array.isRequired,
      PropTypes.object.isRequired,
    ]),
    classes: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      showingCorrect: false
    };

    this.instanceId = uniqueId();

    this.toggleCorrect = showingCorrect => {
      this.setState({ showingCorrect });
    };
  }

  componentDidMount() {
    this.initSessionIfNeeded(this.props);
  }

  componentWillReceiveProps(nextProps) {
    const newState = {};

    if (!nextProps.model.correctResponse) {
      newState.showingCorrect = false;
    }

    const includeTargetsChanged = nextProps.model.config.includeTargets !== this.props.model.config.includeTargets;
    const choicesNumberChanged = nextProps.model.choices.length !== this.props.model.choices.length;

    if (includeTargetsChanged || choicesNumberChanged) {
      this.initSessionIfNeeded(nextProps);
    }

    this.setState(newState);
  }

  initSessionIfNeeded(props) {
    const { model, session, onSessionChange } = props;
    const { config: newConfig } = model;

    const compactSessionValues = (session && compact(session.value)) || [];

    if (!newConfig.includeTargets && compactSessionValues.length !== model.choices.length) {
      log('[initSessionIfNeeded] initing session...', newConfig.includeTargets);
      const update = cloneDeep(session);
      update.value = model.choices.map(m => m.id);
      onSessionChange(update);
    } else if (newConfig.includeTargets) {
      const update = cloneDeep(session);

      delete update.value;

      onSessionChange(update);
    }
  }

  onDropChoice(target, source) {
    const { onSessionChange, session } = this.props;
    const from = this.ordering.tiles.find(
      t => t.id === source.id && t.type === source.type
    );
    const to = target;
    log('[onDropChoice] ', from, to);
    const update = reducer({ type: 'move', from, to }, this.ordering);
    const sessionUpdate = Object.assign({}, session, {
      value: update.response
    });
    onSessionChange(sessionUpdate);
  }

  onRemoveChoice(target) {
    const { onSessionChange, session } = this.props;
    log('[onRemoveChoice]', target);
    const update = reducer({ type: 'remove', target }, this.ordering);
    const sessionUpdate = Object.assign({}, session, {
      value: update.response
    });

    onSessionChange(sessionUpdate);
  }

  createOrdering = () => {
    const { model, session } = this.props;
    const { showingCorrect } = this.state;
    const config = model.config || {
        orientation: 'vertical',
        includeTargets: true
      };
    const { includeTargets } = config;

    return showingCorrect
      ? buildState(
        model.choices,
        model.correctResponse,
        model.correctResponse.map(id => ({ id, outcome: 'correct' })),
        { includeTargets },
        model.config.removeTile
      )
      : buildState(model.choices, session.value, model.outcomes, {
          includeTargets
        },
        model.config.removeTile
      );
  };

  render() {
    const { classes, model } = this.props;
    const showToggle =
      model.correctResponse && model.correctResponse.length > 0;
    const { showingCorrect } = this.state;
    const config = model.config || {
      orientation: 'vertical',
      includeTargets: true
    };
    const { orientation, includeTargets } = config;
    const vertical = orientation === 'vertical';

    this.ordering = this.createOrdering();

    const Tiler = vertical ? VerticalTiler : HorizontalTiler;

    return (
      <div className={classes.placementOrdering}>
        <CorrectAnswerToggle
          show={showToggle}
          toggled={this.state.showingCorrect}
          onToggle={this.toggleCorrect}
        />

        <div
          className={classes.prompt}
          dangerouslySetInnerHTML={{ __html: model.prompt }}
        />

        <Tiler
          instanceId={this.instanceId}
          choiceLabel={config.choiceLabel}
          targetLabel={config.targetLabel}
          tiles={this.ordering.tiles}
          disabled={model.disabled}
          addGuide={model.config.showOrdering}
          tileSize={model.config && model.config.tileSize}
          includeTargets={includeTargets}
          onDropChoice={this.onDropChoice.bind(this)}
          onRemoveChoice={this.onRemoveChoice.bind(this)}
        />

        <br />
        {!showingCorrect && (
          <Feedback correctness={model.correctness} feedback={model.feedback} />
        )}
      </div>
    );
  }
}

const styles = {
  placementOrdering: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxSizing: 'border-box'
  },
  prompt: {
    padding: '5px',
    paddingBottom: '15px'
  }
};

export default withStyles(styles)(PlacementOrdering);
