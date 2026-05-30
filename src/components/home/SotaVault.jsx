import React from "react";
import { Jumbotron } from "./migration";

const SotaVault = ({ heading, logoSrc, description, highlights, websiteUrl }) => {
  return (
    <Jumbotron id="sotavault" className="m-0 section-block section-sotavault">
      <div className="container text-center">
        <div className="home-section-content">
          <h2 className="display-4 mb-4">{heading}</h2>
          {websiteUrl ? (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="d-inline-block mb-4"
            >
              <img
                className="img-fluid"
                src={logoSrc}
                alt="SotaVault"
                style={{ maxWidth: 280, height: "auto" }}
              />
            </a>
          ) : (
            <img
              className="img-fluid mb-4"
              src={logoSrc}
              alt="SotaVault"
              style={{ maxWidth: 280, height: "auto" }}
            />
          )}
          {websiteUrl && (
            <p className="mb-5">
              <a href={websiteUrl} target="_blank" rel="noopener noreferrer">
                sotavault.ai
              </a>
            </p>
          )}
          <h3 className="h4 mb-3">What is SotaVault?</h3>
          <p className="lead mb-5">{description}</p>
          <h3 className="h5 mb-3">As a founder and a lead engineer: </h3>
          <ul className="lead text-start mx-auto ps-3">
            {highlights.map((item, index) => (
              <li key={index} className="mb-3">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Jumbotron>
  );
};

export default SotaVault;
