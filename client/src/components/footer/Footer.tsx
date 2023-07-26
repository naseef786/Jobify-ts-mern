
import React from 'react';
import './footer.css'
function Footer(): JSX.Element {
  return (
    <section>
      <footer className="top">
        <img src="logo.svg" alt="Logo" />
        <div className="links">
          <div>
            <h2>Platform</h2>
            <a>Directus Core</a>
            <a>Open Data Platform</a>
            <a>Feature List</a>
            <a>Road Map</a>
            <a>Marketplace</a>
          </div>
          <div>
            <h2>Cloud</h2>
            <a>Dashboard</a>
            <a>Register</a>
            <a>Pricing</a>
            <a>System Status</a>
            <a>Partner Program</a>
          </div>
        </div>
      </footer>
      <footer className="bottom">
        <div className="legal">
          <span> © 2023 All rights reserved </span>
          <a> License </a>
          <a> Terms </a>
          <a> Privacy </a>
        </div>
        <div className="links">
          <a className="fa-brands fa-github"></a>
          <a className="fa-brands fa-linkedin"></a>
          <a className="fa-brands fa-docker"></a>
        </div>
      </footer>
    </section>
  );
}

export default Footer;
