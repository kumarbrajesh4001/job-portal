import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Dialog from '../../../components/dialog';
import UI from '../../../constants/ui';

function FlipConfirmation(props) {
  const { isDialogOpen, primaryAction, secondaryAction } = props;
  return (
    <Dialog
      title={UI.FLIP_THE_QUESTIONS}
      content={UI.SURE_FLIP_QUESTION}
      primaryLabel={UI.YES}
      primaryAction={primaryAction}
      secondaryLabel={UI.NO}
      secondaryAction={secondaryAction}
      isDialogOpen={isDialogOpen}
    />
  );
}

FlipConfirmation.propTypes = {
  isDialogOpen: PropTypes.bool,
  primaryAction: PropTypes.func,
  secondaryAction: PropTypes.func,
};

FlipConfirmation.defaultProps = {
  isDialogOpen: false,
  primaryAction: noop,
  secondaryAction: noop,
};

export default FlipConfirmation;
