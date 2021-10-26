import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Rating from './Reating';
import SavedAssessments from './SavedAssessments';

class Evaluation extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      rating: 0,
      evaluation: '',
    };
  }

  saveEvaluation() {
    const {
      email,
      rating,
      evaluation,
    } = this.state;
    const { match } = this.props;

    const savedAssessments = JSON.parse(localStorage.getItem('savedAssessments')) || [];
    savedAssessments.push({ id: match.params.id, email, rating, evaluation });
    localStorage.setItem('savedAssessments', JSON.stringify(savedAssessments));
  }

  render() {
    return (
      <div>
        <h3>Avaliações</h3>
        <br />
        <form className="reating-border">
          <input
            onChange={ (event) => {
              this.setState({
                email: event.target.value,
              });
            } }
            className="form-control "
            type="email"
            placeholder="Digite seu e-mail"
          />
          <br />
          <br />
          <Rating
            maxRating={ 5 }
            setRating={ (selectedRating) => {
              this.setState({ rating: selectedRating });
            } }
          />
          <br />
          <textarea
            onChange={ (event) => {
              this.setState({
                evaluation: event.target.value,
              });
            } }
            className="form-textarea"
            data-testid="product-detail-evaluation"
          />
          <br />
          <br />
          <div className="d-flex jc-end">
            <button
              type="submit"
              className="btn"
              onClick={ (event) => {
                event.preventDefault();
                this.saveEvaluation();
              } }
            >
              Enviar avaliação

            </button>
          </div>
        </form>

        <SavedAssessments />
      </div>
    );
  }
}

Evaluation.propTypes = {
  match: PropTypes.shape,
}.isRequired;

export default withRouter(Evaluation);
