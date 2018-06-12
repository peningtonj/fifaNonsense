import React, { Component } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux'
import RecentGames from './RecentGames.jsx'
import Rankings from './Rankings.jsx'
import PlayerVPlayerSum from './PlayerVPlayerSum'
import PlayerVPlayer from './PlayerVPlayer'
import PlayerDetails from './PlayerDetails'
class ResultsTab extends Component {

  render() {
    console.log(this.props.recent)
    return(
      <Tabs>
  <TabList>
    <Tab>Rankings</Tab>
    <Tab>Last 10 Games</Tab>
    <Tab>Player Matrix</Tab>
    <Tab>Player Match Up</Tab>
    <Tab>Player Details</Tab>
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
  <TabPanel>
    <PlayerVPlayer />
  </TabPanel>
  <TabPanel>
    <PlayerDetails />
  </TabPanel>
</Tabs>
    )
  }
}


function mapStateToProps(store){
  return {};
}

export default connect(mapStateToProps)(ResultsTab)
