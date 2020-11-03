import React, { useState } from 'react';
import { addSongApi } from './../../utils/songsApi';
import { Button, SytedInput, Container } from './../../styles/styles';

const AddSong = (props) => {
  const [songName, setSongName] = useState('');
  const [onlyPremium, setOnlyPremium] = useState(false);
  const onFormSubmit = (event) => {
    event.preventDefault();
    addSongApi(songName, onlyPremium)
      .then((response) => {})
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <form onSubmit={(e) => onFormSubmit(e)}>
        <label id='song-input'>Song name</label>
        <br />
        <SytedInput
          value={songName}
          type='text'
          onChange={(e) => setSongName(e.target.value)}
          id='song-input'></SytedInput>
        <br />
        <label>
          Select the plan:
          <br />
          <select value={onlyPremium} onChange={() => setOnlyPremium(!onlyPremium)}>
            <option value={true}> Gold</option>
            <option value={false}> Silver</option>
          </select>
        </label>
        <br />
        <button onClick={props.update}>Add Song</button>
      </form>
    </div>
  );
};

export default AddSong;
