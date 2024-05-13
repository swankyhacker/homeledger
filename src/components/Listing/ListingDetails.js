import { TextField } from "@mui/material";

const ListingDetails = () => {
  return (
    <>
      <TextField
        id="standard-read-only-input"
        label="Floor Size"
        defaultValue="1024 sqft"
        InputProps={{
          readOnly: true,
        }}
        variant="standard"
      />
      <TextField
        id="standard-read-only-input"
        label="Property Type"
        defaultValue="Condominium"
        InputProps={{
          readOnly: true,
        }}
        variant="standard"
      />
      <TextField
        id="standard-read-only-input"
        label="Availability"
        defaultValue="Yes"
        InputProps={{
          readOnly: true,
        }}
        variant="standard"
      />
      <TextField
        id="standard-read-only-input"
        label="Developer"
        defaultValue="Krishna Builders"
        InputProps={{
          readOnly: true,
        }}
        variant="standard"
      />
      <TextField
        id="standard-read-only-input"
        label="Listed Date"
        defaultValue="21/04/2024"
        InputProps={{
          readOnly: true,
        }}
        variant="standard"
      />
      <TextField
        id="standard-read-only-input"
        label="Furnishing"
        defaultValue="Fully furnished"
        InputProps={{
          readOnly: true,
        }}
        variant="standard"
      />
    </>
  );
};

export default ListingDetails;
