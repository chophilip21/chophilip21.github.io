import React from "react";

import axios from "axios";
import { Jumbotron } from "./migration";

const pictureLinkRegex = new RegExp(
  /[(http(s)?):(www.)?a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
);

const AboutMe = ({ heading, message, link, imgSize, resume }) => {
  const [profilePicUrl, setProfilePicUrl] = React.useState("");
  const [showPic, setShowPic] = React.useState(Boolean(link));

  React.useEffect(() => {
    const handleRequest = async () => {
      const instaLink = "https://www.instagram.com/";
      const instaQuery = "/?__a=1";
      try {
        const response = await axios.get(instaLink + link + instaQuery);
        setProfilePicUrl(response.data.graphql.user.profile_pic_url_hd);
      } catch (error) {
        setShowPic(false);
        console.error(error.message);
      }
    };

    if (link && !pictureLinkRegex.test(link)) {
      handleRequest();
    } else {
      setProfilePicUrl(link);
    }
  }, [link]);

  return (
    <Jumbotron id="aboutme" className="m-0 section-block section-about about-me-section">
      <div className="container">
        <h2 className="display-4 text-center about-me-heading">{heading}</h2>
        {showPic && (
          <div className="text-center about-me-photo-wrap">
            <img
              className="about-me-photo border border-secondary rounded-circle"
              src={profilePicUrl}
              alt="Philip Cho"
              width={imgSize}
              height={imgSize}
            />
          </div>
        )}
        <div
          className="about-me-body"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      </div>
    </Jumbotron>
  );
};

export default AboutMe;
