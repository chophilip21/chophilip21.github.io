import React from "react";
import Container from "react-bootstrap/Container";
import Typist from 'react-typist-component';
import { Jumbotron } from "./migration";

const MainBody = React.forwardRef(
  ({ gradient, title, message, icons }, ref) => {
    return (
      <Jumbotron
        fluid
        id="home"
        style={{ backgroundColor: 'transparent' }}
        className="title position-relative overflow-hidden bg-transparent text-light min-vh-100 d-flex align-content-center align-items-center flex-wrap m-0"
      >
        <video
          autoPlay
          loop
          playsInline
          muted
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            zIndex: -1,
          }}
          src={`${process.env.PUBLIC_URL}/space.mp4`}
        />
        <div id="stars"></div>
        <Container className="text-center position-relative" style={{ zIndex: 1 }}>
          <h1 ref={ref} className="display-1" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7)' }}>
            {title}
          </h1>
          <Typist>
            <div
              className="lead typist"
              style={{
                color: 'white',
                textShadow: '1px 1px 2px rgba(0,0,0,0.7)',
                display: 'inline-block'
              }}
            >
              {message}
            </div>
          </Typist>
          <div className="p-5">
            {icons.map((icon, index) => (
              <a
                key={`social-icon-${index}`}
                target="_blank"
                rel="noopener noreferrer"
                href={icon.url}
                aria-label={`My ${icon.image.split("-")[1]}`}
              >
                <i className={`fab ${icon.image}  fa-3x socialicons`} />
              </a>
            ))}
          </div>
          <a
            className="btn btn-outline-light btn-lg shadow border border-light"
            href="#aboutme"
            role="button"
            aria-label="Learn more about me"
          >
            More about me
          </a>
        </Container>
      </Jumbotron>
    );
  }
);

export default MainBody;
