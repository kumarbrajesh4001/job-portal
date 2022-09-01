import PropTypes from 'prop-types';
import noop from 'lodash/noop';

import Dialog from '../../../components/dialog';
import UI from '../../../constants/ui';

function SubmitAssessment(props) {
  const { isDialogOpen, primaryAction, secondaryAction } = props;
  return (
    <Dialog
      title={UI.SUBMIT_ASSESSMENT}
      content={UI.YOU_ARE_GOING_TO_SUBMIT_ASSESSMENT}
      primaryLabel={UI.GENERATE_REPORT}
      primaryAction={primaryAction}
      secondaryLabel={UI.CLOSE}
      secondaryAction={secondaryAction}
      isDialogOpen={isDialogOpen}
    />
  );
}

SubmitAssessment.propTypes = {
  isDialogOpen: PropTypes.bool,
  primaryAction: PropTypes.func,
  secondaryAction: PropTypes.func,
};

SubmitAssessment.defaultProps = {
  isDialogOpen: false,
  primaryAction: noop,
  secondaryAction: noop,
};
export default SubmitAssessment;
