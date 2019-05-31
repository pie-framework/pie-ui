import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';



 
const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  colorPrimary: {
    color: 'red',
  }
});

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
 
class StimulusTabs extends React.Component {
  state = {
    activeTab: 0,
  };
 
  handleChange = (event, activeTab) => {
    this.setState( () => ({activeTab}));
  };
 
  render() {
    const { classes, tabs } = this.props;
    const { activeTab } = this.state;
    if (tabs && tabs.length > 1) {
      return (
        <div className={classes.root}>
         
            <Tabs value={activeTab} onChange={this.handleChange}>
              {
              tabs.map( tab => (
                <Tab
                  key={tab.id}
                  label={tab.title}
                  value={tab.id}
                />
                
              ))
              }
            </Tabs>
              {
                tabs.map( tab => (
                  activeTab === tab.id
                    ? <TabContainer key={tab.id}><div key={tab.id}  dangerouslySetInnerHTML={{__html: tab.text}} /></TabContainer>
                    : null
                ))
              }
        </div>
      );
    } else if (tabs && tabs[0]) {
      return (
        <div>
         <TabContainer><div dangerouslySetInnerHTML={{__html: tabs[0].text}} /></TabContainer>
        </div>
      );
    }
 
  }
}
 
StimulusTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired)
    .isRequired,
};
 
export default withStyles(styles)(StimulusTabs);
