import { TextField } from "@mui/material";

const PropertyForm = ({ formDetails, setFormDetails }) => {
  const defaultStyle = { width: "30%", marginLeft: 20 };
  const variableToFieldNames = {
    name: "Name",
    address: "Address",
    unitNumber: "Unit Number",
    city: "City",
    state: "State",
    propertyType: "Property Type",
  };
  return (
    <>
      {Object.keys(variableToFieldNames).map((variable) => (
        <TextField
          key={variable}
          required
          id="outlined-required"
          label={variableToFieldNames[variable]}
          style={{ ...defaultStyle }}
          value={formDetails[variable]}
          onChange={(event) =>
            setFormDetails({ ...formDetails, [variable]: event.target.value })
          }
        />
      ))}
    </>
  );
};

export default PropertyForm;
