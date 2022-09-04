import React, { useState, useEffect } from "react";
import Select from "react-select";

import axios from "../../api/axios";

const countriesApi = "https://countriesnow.space/api/v0.1/countries";

const AddressSelector = ({ object, setObject }) => {
  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(countriesApi);
        setCountries(response.data.data);

        if (object.address?.country !== "") {
          setCities(
            countries.find((c) => c.country === object.address?.country)
              ?.cities || []
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountries();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getCountries = () => {
    return countries.map((country) => {
      return {
        label: country.country,
        value: country.country,
      };
    });
  };

  const handleCountryChange = (e) => {
    const country = e.value;
    setObject({
      ...object,
      address: {
        ...object.address,
        country: country,
      },
    });

    setCities(countries.find((c) => c.country === country)?.cities || []);
  };

  const handleCityChange = (e) => {
    setObject({
      ...object,
      address: {
        ...object.address,
        city: e.value,
      },
    });
  };

  const handleTextChange = (e) => {
    const value = e.target.value;
    const key = e.target.id;

    setObject({
      ...object,
      address: {
        ...object.address,
        [key]: value,
      },
    });
  };

  return (
    <>
      <div className="row mb-2">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="street">Street:</label>
            <input
              className="form-control"
              type="text"
              id="street"
              value={object.address.street}
              onChange={handleTextChange}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="country">Country:</label>
            <Select
              id="country"
              options={getCountries()}
              onChange={handleCountryChange}
              value={{
                label: object.address.country,
                value: object.address.country,
              }}
            />
          </div>
        </div>
      </div>

      <div className="row mb-2">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="city">City:</label>
            <Select
              id="city"
              isDisabled={cities?.length || 0 < 1}
              onChange={handleCityChange}
              value={{ label: object.address.city, value: object.address.city }}
              options={cities.map((c) => {
                return { label: c, value: c };
              })}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="zipCode">Zip code:</label>
            <input
              type="text"
              className="form-control"
              id="zipCode"
              value={object.address.zipCode}
              onChange={handleTextChange}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressSelector;
