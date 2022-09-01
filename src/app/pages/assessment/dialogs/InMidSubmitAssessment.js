import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Dialog from '../../../components/dialog';
import UI from '../../../constants/ui';

function InMidSubmitAssessment(props) {
  const { isDialogOpen, primaryAction, secondaryAction, remainingQuesions } =
    props;
  return (
    <Dialog
      title={UI.SUBMIT_ASSESSMENT}
      content={`${UI.HOLD_ON}, ${remainingQuesions} ${UI.QUESTIONS_REMAINING}. 
${UI.SURE_SUBMIT_ASSESSMENT}`}
      primaryLabel={UI.YES}
      primaryAction={primaryAction}
      secondaryLabel={UI.NO}
      secondaryAction={secondaryAction}
      isDialogOpen={isDialogOpen}
    />
  );
}

InMidSubmitAssessment.propTypes = {
  isDialogOpen: PropTypes.bool,
  primaryAction: PropTypes.func,
  secondaryAction: PropTypes.func,
  remainingQuesions: PropTypes.number,
};

InMidSubmitAssessment.defaultProps = {
  isDialogOpen: false,
  primaryAction: noop,
  secondaryAction: noop,
  remainingQuesions: 0,
};

export default InMidSubmitAssessment;
