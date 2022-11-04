import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {
  const [relevance, setRelevance] = React.useState('');

  const handleChange = (event) => {
    setRelevance(event.target.value);
  };

  props.getSelectValue(relevance);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl >
        <InputLabel id="demo-simple-select-label">{props.headerName}</InputLabel>
        <Select
        className={props.className}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={relevance}
          defaultValue={0}
          label={props.headerName}
          onChange={handleChange}
        >
          <MenuItem value="DATABASE">As per Database</MenuItem>
          <MenuItem value="ASCENDING">Price Low to high</MenuItem>
          <MenuItem value="DESCENDING">Price High To Low</MenuItem>
          <MenuItem value="NEW_LAUNCH">Newest Launch</MenuItem>
          <MenuItem value="PUBLISHED_YEAR">Launch year</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
