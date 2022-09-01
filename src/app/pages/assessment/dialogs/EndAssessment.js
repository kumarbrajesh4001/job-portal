import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import Dialog from '../../../components/dialog';
import UI from '../../../constants/ui';

function EndAssessment(props) {
  const { isDialogOpen, primaryAction, secondaryAction } = props;
  return (
    <Dialog
      title={UI.END_ASSESSMENT_TITLE}
      content={UI.SURE_END_ASSESSMENT}
      primaryLabel={UI.YES}
      primaryAction={primaryAction}
      secondaryLabel={UI.NO}
      secondaryAction={secondaryAction}
      isDialogOpen={isDialogOpen}
    />
  );
}

EndAssessment.propTypes = {
  isDialogOpen: PropTypes.bool,
  primaryAction: PropTypes.func,
  secondaryAction: PropTypes.func,
};

EndAssessment.defaultProps = {
  isDialogOpen: false,
  primaryAction: noop,
  secondaryAction: noop,
};

export default EndAssessment;
