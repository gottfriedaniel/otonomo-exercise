import createStreamerFrom from '../api/streamer'
import generateCarData from '../api/data-generator'

export const addNewStreamer = (vin, subscriber) => {
  const carStreamer = createStreamerFrom(() => generateCarData(vin))
  carStreamer.subscribe(subscriber)
  carStreamer.start();
  return carStreamer;
}
