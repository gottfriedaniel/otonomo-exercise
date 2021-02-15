import React, {useState} from 'react'
import './WatchList.scss'
import Checkbox from './Checkbox'
import Input from './Input'
import Button from './Button'

export default function WatchList({ cars, toggleCarWatchList, addCarToWatchList }) {
  const [vinInput, setVinInput] = useState('');

  const onAddClicked = () => {
    addCarToWatchList(vinInput);
    setVinInput('');
  }

  return (
    <div className="watch-list">
      <Input className="vin-input" placeholder="Enter VIN" onChange={({target: {value}}) => setVinInput(value)} value={vinInput} />
      <Button className="add-button" disabled={vinInput === ''} onClick={onAddClicked}>ADD</Button>
      {Object.entries(cars).map(([vin, car]) => (
        <div className="car" key={vin} style={{color: car.color}}>
          <Checkbox checked={car.watched} onChange={({target: {checked}}) => toggleCarWatchList(vin, checked)}>
            {vin}
          </Checkbox>
        </div>
      ))}
    </div>
  )
}
