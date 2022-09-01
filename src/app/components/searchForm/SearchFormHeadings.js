import PropTypes from 'prop-types';

function SearchFormHeadings(props) {
  const { isEmployer } = props;

  return (
    <div className="container">
      <div className="row">
        <div className="mt-3 d-flex justify-content-center headline-3-bold color-1F2830">
          <b>{isEmployer ? 'Get Talent' : 'Get Jobs'}</b>
        </div>
        <span className="d-flex justify-content-center headline-6">
          {isEmployer
            ? 'Instant access to job-ready candidates'
            : 'Automate your job search. Upskill. Get hired instantly.'}
        </span>
      </div>
    </div>
  );
}

SearchFormHeadings.propTypes = {
  isEmployer: PropTypes.bool,
};

SearchFormHeadings.defaultProps = {
  isEmployer: false,
};

export default SearchFormHeadings;
