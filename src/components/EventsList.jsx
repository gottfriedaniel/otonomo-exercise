import React, {useState} from 'react'
import './EventsList.scss'
import Checkbox from './Checkbox'
import EventNotification from './EventNotification'

export default function EventsList({ streamers }) {
  const [fuelFilter, setFuelFilter] = useState(false);

  const getFilteredEvents = (streamers) => {
    return Object.entries(streamers).map(([vin, streamer]) => ({...streamer, id: vin})).filter(streamer => {
      return streamer.watched && (fuelFilter ? parseFloat(streamer.carData.fuel) < 0.15 : true);
    })
  }

  return (
    <div className="events-list">
      <div className="filters">
        <Checkbox checked={fuelFilter} onChange={({target: {checked}}) => setFuelFilter(checked)}>Filter events where fuel level is under 15%</Checkbox>
      </div>
      <div className="events-wrapper">
        {getFilteredEvents(streamers, fuelFilter).map(event => (
          event.carData && <div className="event" key={event.id}>
            <EventNotification carEvent={event.carData} color={event.color} />
          </div>
        ))}
      </div>
    </div>
  )
}
