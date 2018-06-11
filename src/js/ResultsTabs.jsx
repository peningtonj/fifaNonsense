import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux'
import RecentGames from './RecentGames.jsx'
import Rankings from './Rankings.jsx'
import PlayerVPlayerSum from './PlayerVPlayerSum'

class ResultsTab extends Component {

  render() {
    console.log(this.props.recent)
    return(
      <Tabs>
  <TabList>
    <Tab>Rankings</Tab>
    <Tab>Last 10 Games</Tab>
    <Tab>Player Matrix</Tab>
  </TabList>
  <TabPanel>
    <Rankings />
  </TabPanel>
  <TabPanel>
    <RecentGames />
  </TabPanel>
  <TabPanel>
    <PlayerVPlayerSum />
  </TabPanel>
</Tabs>
    )
  }
}


function mapStateToProps(store){
  return {};
}

export default connect(mapStateToProps)(ResultsTab)
