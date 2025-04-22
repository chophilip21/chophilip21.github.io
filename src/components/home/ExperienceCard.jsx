import React from 'react';

import {
  Col,
} from "react-bootstrap";

const ExperienceCard = ({ data, imageSize }) => {
  return (
    <Col lg="6">
      <div className="pb-5 text-center">
        <img
          className="bg-white mb-3"
          src={data.companylogo}
          alt={data.role}
          width={imageSize}
          style={{ height: 'auto' }}
        />
        <p className="lead">
          {data.role}
          <br />
          {data.date}
        </p>

      </div>
    </Col>
  );
}

export default ExperienceCard;