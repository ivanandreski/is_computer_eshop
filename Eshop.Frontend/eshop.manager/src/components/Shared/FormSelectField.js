import React, { useState, useEffect } from "react";
import Select from "react-select";

class SelectItem {
  constructor(value, label) {
    this.value = value;
    this.label = label;
  }
}

const FormSelectField = ({ service, type, title, object, setObject }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = () => {
      service
        .fetchAll()
        .then((response) => setItems(response.data))
        .catch((error) => console.log(error));
    };
    fetchItems();
  }, [service]);

  const mapItems = () => {
    return items.map((item) => new SelectItem(item.hashId, item.name));
  };

  const handleChange = (e) => {
    const { value } = e;

    setObject({ ...object, [type]: value });
  };

  return (
    <>
      <div className="form-group">
        <h5>{title}:</h5>
        <Select options={mapItems()} onChange={handleChange} />
      </div>
    </>
  );
};

export default FormSelectField;
