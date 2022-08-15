import React from "react";

const Address = ({ address }) => {
  return address !== undefined ? (
    <>
      <h5>Address:</h5>
      <p>{address.street},</p>
      <p>
        {address.zipCode}, {address.city},
      </p>
      <p>{address.country}</p>
    </>
  ) : (
    <></>
  );
};

export default Address;
