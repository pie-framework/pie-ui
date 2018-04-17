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
import { withStyles } from 'material-ui/styles';

const log = debug('pie-elements:placement-ordering');

export class PlacementOrdering extends React.Component {
  static propTypes = {
    onSessionChange: PropTypes.func.isRequired,
    model: PropTypes.object.isRequired,
    session: PropTypes.object.isRequired,
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

  componentWillReceiveProps(nextProps) {
    if (!nextProps.model.correctResponse) {
      this.setState({ showingCorrect: false });
    }
  }

  onDropChoice(ordering, target, source) {
    const { onSessionChange, session } = this.props;
    const from = ordering.tiles.find(
      t => t.id === source.id && t.type === source.type
    );
    const to = target;
    log('[onDropChoice] ', from, to);
    const update = reducer({ type: 'move', from, to }, ordering);
    const sessionUpdate = Object.assign({}, session, {
      value: update.response
    });
    onSessionChange(sessionUpdate);
  }

  onRemoveChoice(ordering, target) {
    const { onSessionChange, session } = this.props;
    log('[onRemoveChoice]', target);
    const update = reducer({ type: 'remove', target }, ordering);
    const sessionUpdate = Object.assign({}, session, {
      value: update.response
    });
    onSessionChange(sessionUpdate);
  }

  componentDidUpdate() {
    this.initSessionIfNeeded();
  }

  componentDidMount() {
    this.initSessionIfNeeded();
  }

  initSessionIfNeeded() {
    const { model, session, onSessionChange } = this.props;
    const config = model.config || { includeTargets: true };

    log(
      '[initSessionIfNeeded] config:',
      config,
      'session.value: ',
      session.value
    );
    if (!config.includeTargets && isEmpty(compact(session.value))) {
      log('[initSessionIfNeeded] initing session...', config.includeTargets);
      const update = cloneDeep(session);
      update.value = model.choices.map(m => m.id);
      onSessionChange(update);
    }
  }

  render() {
    const { classes, model, session } = this.props;
    const showToggle =
      model.correctResponse && model.correctResponse.length > 0;
    const { showingCorrect } = this.state;
    const config = model.config || {
      orientation: 'vertical',
      includeTargets: true
    };
    const { orientation, includeTargets } = config;
    const vertical = orientation === 'vertical';

    const ordering = showingCorrect
      ? buildState(
          model.choices,
          model.correctResponse,
          model.correctResponse.map(id => ({ id, outcome: 'correct' })),
          { includeTargets }
        )
      : buildState(model.choices, session.value, model.outcomes, {
          includeTargets
        });

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
          tiles={ordering.tiles}
          disabled={model.disabled}
          addGuide={model.config.showOrdering}
          tileSize={model.config && model.config.tileSize}
          includeTargets={includeTargets}
          onDropChoice={this.onDropChoice.bind(this, ordering)}
          onRemoveChoice={this.onRemoveChoice.bind(this, ordering)}
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
