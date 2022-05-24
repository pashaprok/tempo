import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
import '../styles/not-found.page.css';

export const NotFoundPage = () => (
  <div className="container">
    <div className="page-not-found-content">
      <h1>
        <FontAwesomeIcon icon={faQuestion} />
        <br />
        404. Page not found!
        <br />
        <FontAwesomeIcon icon={faQuestion} />
      </h1>
    </div>
  </div>
);
