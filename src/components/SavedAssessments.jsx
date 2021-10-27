import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class SavedAssessments extends React.Component {
  render() {
    const { match } = this.props;
    const savedAssessments = (JSON.parse(localStorage.getItem('savedAssessments')) || [])
      .filter((savedAssessment) => savedAssessment.id === match.params.id);

    return (
      <div>
        {
          savedAssessments.map((savedAssessment, index) => (
            <div key={ index } className="saved-assessments">
              <div>
                <span>E-mail: </span>
                <span>{savedAssessment.email}</span>
              </div>
              <div>
                <span>Nota: </span>
                <span>{savedAssessment.rating}</span>
              </div>
              <div>
                <span>Avaliação: </span>
                <span>{savedAssessment.evaluation}</span>
              </div>
            </div>
          ))
        }
      </div>
    );
  }
}

SavedAssessments.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default withRouter(SavedAssessments);
