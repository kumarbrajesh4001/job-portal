import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Dialog from '../../components/dialog';
import UI from '../../constants/ui';

function UnlockCandidateDialog(props) {
  const {
    isDialogOpen,
    primaryAction,
    secondaryAction,
    content,
    primaryLabel,
    secondaryLabel,
  } = props;
  return (
    isDialogOpen && (
      <Dialog
        title={UI.DO_YOU_WANT_TO_CONFIRM}
        content={content}
        primaryLabel={primaryLabel}
        primaryAction={primaryAction}
        secondaryLabel={secondaryLabel}
        secondaryAction={secondaryAction}
        isDialogOpen={isDialogOpen}
      />
    )
  );
}

UnlockCandidateDialog.propTypes = {
  isDialogOpen: PropTypes.bool,
  primaryAction: PropTypes.func,
  secondaryAction: PropTypes.func,
  content: PropTypes.string,

  primaryLabel: PropTypes.string,
  secondaryLabel: PropTypes.string,
};

UnlockCandidateDialog.defaultProps = {
  isDialogOpen: false,
  primaryAction: noop,
  secondaryAction: noop,
  content: undefined,

  primaryLabel: undefined,
  secondaryLabel: undefined,
};

export default UnlockCandidateDialog;
