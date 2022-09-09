import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import UserApiService from "../../api/UserApiService";
import TrustedUserIcon from "../Core/TrustedUserIcon";

const ProfileDetails = () => {
  const axiosPrivate = useAxiosPrivate();
  const userApi = new UserApiService(axiosPrivate);

  const [profileDetails, setProfileDetails] = useState({});

  useEffect(() => {
    const getDetails = async () => {
      try {
        const response = await userApi.getDetails();
        setProfileDetails(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderAddress = () => {
    return profileDetails.address !== null ? (
      <>
        <div>{profileDetails.address?.street},</div>
        <div>
          <span>
            {profileDetails.address?.zipCode}, {profileDetails.address?.city},
          </span>
        </div>
        <div>{profileDetails.address?.country}</div>
      </>
    ) : (
      <p>{"/"}</p>
    );
  };

  //   console.log(profileDetails);

  return (
    <div className="card p-4">
      <div className="form-group">
        <span>
          <TrustedUserIcon username={profileDetails?.username} />
          <strong>Username:</strong>
        </span>
        <p>{profileDetails.username}</p>
      </div>
      <div className="form-group">
        <strong>Email:</strong>
        <p>{profileDetails.email}</p>
      </div>
      <div className="form-group">
        <strong>First Name:</strong>
        <p>{profileDetails.firstName}</p>
      </div>
      <div className="form-group">
        <strong>Last Name:</strong>
        <p>{profileDetails.lastName}</p>
      </div>
      <div className="form-group">
        <strong>Phone number:</strong>
        <p>{profileDetails.phone}</p>
      </div>
      <div className="form-group">
        <strong>Address:</strong>
        {renderAddress()}
      </div>
      <div className="form-group">
        <strong>Forum score:</strong>
        <p>{profileDetails.forumScore}</p>
      </div>
    </div>
  );
};

export default ProfileDetails;
