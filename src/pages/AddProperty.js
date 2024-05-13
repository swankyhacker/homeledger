import { Button, TextField } from "@mui/material";

import { useState } from "react";
import { CorrectUpload, IncorrectUpload } from "../chain/AddProperty";
import { PropertyForms } from "../components/AddProperty";
import { Wrapper } from "../components/common";
import { useNavigate } from "react-router-dom";

const AddProperty = () => {
  const [formDetails, setFormDetails] = useState({
    name: "",
    address: "",
    unitNumber: "",
    city: "",
    state: "",
    propertyType: "",
  });
  const [uploadCorrectDocs, setUploadCorrectDocs] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <Wrapper>
      <div className="w-7/12 h-[90%] bg-white mx-auto my-auto shadow-xl">
        <div className="w-11/12 h-[95%] flex flex-col items-center mx-auto my-3">
          <div className="font-bold text-2xl h-[10%]">Add Listing</div>
          <div className="w-full h-[35%] flex flex-wrap">
            <PropertyForms
              formDetails={formDetails}
              setFormDetails={setFormDetails}
            />
          </div>
          <div className="w-full h-[25%] flex flex-wrap">
            <TextField
              id="outlined-required"
              label="Description"
              multiline
              rows={4}
              style={{ width: "100%", marginLeft: 20, marginRight: 20 }}
            />
          </div>
          <div className="w-full h-[10%] flex justify-evenly items-center">
            <Button
              variant={uploadCorrectDocs ? "contained" : "outlined"}
              color="success"
              style={{ width: "20%" }}
              onClick={() => setUploadCorrectDocs(true)}
            >
              Correct
            </Button>
            Upload Documents
            <Button
              variant={uploadCorrectDocs ? "outlined" : "contained"}
              color="error"
              style={{ width: "20%" }}
              onClick={() => setUploadCorrectDocs(false)}
            >
              Wrong
            </Button>
          </div>
          <div className="w-full h-[20%] flex justify-center items-center">
            <Button
              variant="contained"
              style={{ width: "40%", backgroundColor: "#293241" }}
              onClick={
                uploadCorrectDocs
                  ? async () => {
                      await CorrectUpload(formDetails, setError);
                      navigate("/catalogue");
                    }
                  : () => IncorrectUpload(setError)
              }
            >
              Next
            </Button>
          </div>
          {error ? (
            <p className="font-medium text-md text-red-700">{error}</p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default AddProperty;
