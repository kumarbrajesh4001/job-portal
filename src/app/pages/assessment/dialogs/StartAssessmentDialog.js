import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Dialog from '../../../components/dialog/Dialog';
import UI from '../../../constants/ui';

function StartAssessmentDialog(props) {
  const {
    isDialogOpen,
    primaryAction,
    secondaryAction,
    content,
    primaryLabel,
    secondaryLabel,
  } = props;
  return (
    <Dialog
      title={UI.ASSESSMENT_CONFIRM}
      content={content}
      primaryLabel={primaryLabel}
      primaryAction={primaryAction}
      secondaryLabel={secondaryLabel}
      secondaryAction={secondaryAction}
      isDialogOpen={isDialogOpen}
    />
  );
}

StartAssessmentDialog.propTypes = {
  isDialogOpen: PropTypes.bool,
  primaryAction: PropTypes.func,
  secondaryAction: PropTypes.func,
  content: PropTypes.string,
  primaryLabel: PropTypes.string,
  secondaryLabel: PropTypes.string,
};

StartAssessmentDialog.defaultProps = {
  isDialogOpen: false,
  primaryAction: noop,
  secondaryAction: noop,
  content: undefined,
  primaryLabel: undefined,
  secondaryLabel: undefined,
};

export default StartAssessmentDialog;
