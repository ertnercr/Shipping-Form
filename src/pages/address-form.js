import React, { useEffect, useState } from "react";
import { TextField, Button, InputAdornment } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/system";
import {Helmet} from "react-helmet";
import PhoneIcon from "@mui/icons-material/Phone";
import ErrorIcon from "@mui/icons-material/Error";

import TextInputs from "../components/text-inputs";
import SwitchIos from "../components/SwitchIos";
import AutoCompletes from "../components/AutoCompletes";
import { Main } from "./address-formcss";
import dayjs from "dayjs";

import countriesData from "./countries.json";
import cityDistrictData from "./il-ilce.json";

const StyledTextArea = styled(TextField, {
  name: "StyledTextArea",
})({ width: 813, "& .MuiInputBase-root": { height: 96 } });

function AddressForm() {
  const today = new Date();
  let deliveryDate;
  deliveryDate = today.setDate(today.getDate() + 3);
  deliveryDate = dayjs(today).format("MM/DD/YYYY");
  const [countries, setCountries] = useState([]);
  const [cityDistrict, setCityDistrict] = useState([]);
  const [selectedDistricts, setSelectedDistricts] = useState([]);
  const [date, setDate] = useState(null);
  useEffect(() => {
    setCountries(countriesData);
    setCityDistrict(cityDistrictData);
  }, []);

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    state: "",
    city: "",
    district: "",
    address: "",
    isHaveDeadline: false,
    deadline: "",
  });
  const [formErrors, setFormErrors] = useState({
    firstName: false,
    lastName: false,
    phoneNumber: false,
    address: false,
    state: false,
    city: false,
    district: false,
    deadline: false,
  });
  const [ErrorMessages, setErrorMessages] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    address: "",
    state: "This area is required!",
    city: "This area is required!",
    district: "This area is required!",
    deadline: "This area is required!",
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    let maxLength;
    if (name === "address") {
      maxLength = 255;
    } else if (name === "phoneNumber") {
      maxLength = 12;
    } else maxLength = 50;
    
    if (e.target.name === "phoneNumber") {
      if (value.length < maxLength) {
        setValues({ ...values, [e.target.name]: e.target.value });
      }
    }else{
      setValues({ ...values, [e.target.name]: e.target.value });
    }
    
    
    if (value.length === 0) {
      setErrorMessages({...ErrorMessages,[name]: "This area is required!"});
      setFormErrors({ ...formErrors, [name]: true });
    } else if (value.length > 0 && value.length < maxLength) {
      setFormErrors({ ...formErrors, [name]: false });
      setErrorMessages({ ...ErrorMessages, [name]: "" });
    } else if (value.length >= maxLength) {
      setErrorMessages({...ErrorMessages,[name]: "You Exceed The Max Input Length",});
      setFormErrors({ ...formErrors, [name]: true });
    }
  
  };

  const handleSwitchChange = (e) => {
    setValues({ ...values, isHaveDeadline: !values.isHaveDeadline });
    if (values.isHaveDeadline === false)
      setFormErrors({ ...formErrors, deadline: false });
  };
  const validateForm = () => {
    const emptyFields = Object.keys(values).filter((key) => values[key] === "");
    if (emptyFields) {
      emptyFields.map((item) => {
        setErrorMessages((prevValues) => ({...prevValues,[item]: "This area is required!",
        }));
        setFormErrors((prevValues) => ({ ...prevValues, [item]: true }));
        if (values.isHaveDeadline === false && item === "deadline") {
          setFormErrors((prevValues) => ({ ...prevValues, deadline: false }));
        }
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();
    const isValid = e.target.checkValidity();
    if (isValid) {
      console.log(values);
    }};

  const handleOptionChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: false });
    if (e.target.name === "city") {
      const selectedCity = cityDistrict.find((item) => item.il === e.target.value);
      setSelectedDistricts(selectedCity ? selectedCity.ilceleri : []);
    }
  };

  const handleDate = (date) => {
    setDate(date);
    const formatDate = dayjs(date).format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ ([GMT]Z)");
    setValues({ ...values, deadline: formatDate });
    setFormErrors({ ...formErrors, deadline: false });
  };

  return (
    
    <Main>
      <Helmet><title>Shipping Form</title></Helmet>
      <div className="container">
        <div className="top-header">
          <h1 className="header">Shipping Address</h1>
          <h5 className="header-mini">
            Estimated Delivery Date - {deliveryDate}
          </h5>
        </div>

        <div className="group-1">
          <form onSubmit={handleSubmit} noValidate>
            <div className="row">
              <div className="input-error">
                <TextInputs
                  required={true}
                  value={values.firstName}
                  onChange={onChange}
                  className="inputs"
                  name="firstName"
                  label="First Name"
                  error={formErrors.firstName}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
                {formErrors.firstName && (
                  <div className="error-span">
                    <ErrorIcon className="error-span-icon" />
                    <span className="error-message">
                      {ErrorMessages.firstName}
                    </span>
                  </div>
                )}
              </div>
              <div className="input-error">
                <TextInputs
                  value={values.lastName}
                  onChange={onChange}
                  className="inputs-right"
                  name="lastName"
                  label="Last Name"
                  error={formErrors.lastName}
                  inputProps={{
                    maxLength: 50,
                  }}
                />
                {formErrors.lastName && (
                  <div className="error-span">
                    <ErrorIcon className="error-span-icon" />
                    <span className="error-message">
                      {ErrorMessages.lastName}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="second-row">
              <div className="input-error">
                <TextInputs
                  value={values.phoneNumber}
                  onChange={onChange}
                  className="inputs"
                  name="phoneNumber"
                  label="Phone Number"
                  type="number"
                  error={formErrors.phoneNumber}
                  InputProps={{
                    sx: { borderRadius: 2 },
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneIcon className="phone-icon" />
                      </InputAdornment>
                    ),
                  }}
                />
                {formErrors.phoneNumber && (
                  <div className="error-span">
                    <ErrorIcon className="error-span-icon" />{" "}
                    <span className="error-message">
                      {" "}
                      {ErrorMessages.phoneNumber}
                    </span>
                  </div>
                )}
              </div>

              <div className="input-error">
                <AutoCompletes
                  className="inputs-right"
                  options={countries}
                  getOptionLabel={(country) => country.name}
                  onSelect={handleOptionChange}
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      name="state"
                      InputLabelProps={{ shrink: true }}
                      label="Country"
                      value={values.state}
                    />
                  )}
                />
                {formErrors.state && (
                  <div className="error-span">
                    <ErrorIcon className="error-span-icon" />
                    <span className="error-message">{ErrorMessages.state}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="third-row">
              <div className="input-error">
                <AutoCompletes
                  disabled={!values.state}
                  className="inputs"
                  options={cityDistrict}
                  getOptionLabel={(city) => city.il}
                  onSelect={handleOptionChange}
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      value={values.city}
                      InputLabelProps={{ shrink: true }}
                      label="City"
                      variant="outlined"
                      name="city"
                    />
                  )}
                />
                {formErrors.city && (
                  <div className="error-span">
                    <ErrorIcon className="error-span-icon" />{" "}
                    <span className="error-message"> {ErrorMessages.city}</span>
                  </div>
                )}
              </div>

              <div className="input-error">
                <AutoCompletes
                  disabled={!values.city}
                  className="inputs-right"
                  onSelect={handleOptionChange}
                  options={selectedDistricts}
                  getOptionLabel={(ilce) => ilce}
                  renderInput={(params) => (
                    <TextField
                      required
                      {...params}
                      value={values.district}
                      InputLabelProps={{ shrink: true }}
                      label="District"
                      name="district"
                    />
                  )}
                />
                {formErrors.district && (
                  <div className="error-span">
                    <ErrorIcon className="error-span-icon" />
                    <span className="error-message">
                      {ErrorMessages.district}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div className="text-area-div">
              <div className="input-error">
                <StyledTextArea
                  required
                  InputProps={{ sx: { borderRadius: 2 } }}
                  onChange={onChange}
                  name="address"
                  InputLabelProps={{ shrink: true }}
                  label="Address"
                  error={formErrors.address}
                  inputProps={{
                    maxLength: 255,
                  }}
                />
                {formErrors.address && (
                  <div className="error-span uzat">
                    <ErrorIcon className="error-span-icon" />{" "}
                    <span className="error-message">
                      {" "}
                      {ErrorMessages.address}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="fourth-row">
              <span className="deadline">
                Will There Be a Mandatory Deadline?
              </span>
              <SwitchIos
                checked={!values.isHaveDeadline}
                onChange={handleSwitchChange}
                className="switch-button"
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  disabled={!values.isHaveDeadline}
                  value={date}
                  onChange={handleDate}
                  name="deadline"
                  className="inputs"
                  label="Deadline"
                  error={formErrors.deadline}
                  slotProps={{
                    textField: {
                      size: "small",
                      InputLabelProps: { shrink: true },
                      required: true,
                    },
                  }}
                />
              </LocalizationProvider>
            </div>
            {formErrors.deadline && (
              <div className="error-span right">
                <ErrorIcon className="error-span-icon" />
                <span className="error-message">{ErrorMessages.deadline}</span>
              </div>
            )}
            <div className="button-div">
              <Button
                type="submit"
                className="submit-button"
                variant="outlined"
              >
                Submit
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Main>
  );
}
export default AddressForm;
