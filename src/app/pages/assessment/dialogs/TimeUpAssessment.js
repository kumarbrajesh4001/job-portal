import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Dialog from '../../../components/dialog';
import UI from '../../../constants/ui';

function TimeUpAssessment(props) {
  const { isDialogOpen, primaryAction, secondaryAction } = props;
  return (
    <Dialog
      title={UI.SURE_SUBMIT_ASSESSMENT}
      content={UI.GREAT_START}
      primaryLabel={UI.GENERATE_REPORT}
      primaryAction={primaryAction}
      secondaryLabel={UI.RETRY_AFTER_30_DAYS}
      secondaryAction={secondaryAction}
      isDialogOpen={isDialogOpen}
    />
  );
}

TimeUpAssessment.propTypes = {
  isDialogOpen: PropTypes.bool,
  primaryAction: PropTypes.func,
  secondaryAction: PropTypes.func,
};

TimeUpAssessment.defaultProps = {
  isDialogOpen: false,
  primaryAction: noop,
  secondaryAction: noop,
};

export default TimeUpAssessment;
