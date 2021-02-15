import React, { Component } from 'react'
import './App.css'
import WatchList from './components/WatchList'
import EventsList from './components/EventsList'
import { addNewStreamer } from './services/utils'
import createRandomColor from './dom-utils/colors'

class App extends Component {

  state = {
    streamers: {}
  }

  updateState = carData => {
    const {streamers} = { ...this.state };
    streamers[carData.vin].carData = carData;
    this.setState({streamers})
  }

  componentDidMount() {
    this.addCarToWatchList('12345678901234567'); // Initial value just for an example
  }

  componentWillUnmount () {
    const {streamers} = this.state;
    Object.values(streamers).forEach(s => s.streamer.removeHandler(this.updateState))
  }

  toggleCarWatchList = (car, value) => {
    let streamers = { ...this.state.streamers};
    streamers[car].watched = value;
    value ? streamers[car].streamer.start() : streamers[car].streamer.stop();
    this.setState({ streamers })
  }

  addCarToWatchList = (vin) => {
    const carStreamer = addNewStreamer(vin, this.updateState)
    let streamers = { ...this.state.streamers};
    streamers[vin] = { streamer: carStreamer, events: [], watched: true, color: createRandomColor() };
    this.setState({streamers})
  }

  render() {
    const {streamers} = this.state;
    return (
      <div className="App">
          <WatchList cars={streamers} toggleCarWatchList={this.toggleCarWatchList} addCarToWatchList={this.addCarToWatchList} />
          <EventsList streamers={streamers} />
      </div>
    )
  }
}

export default App
