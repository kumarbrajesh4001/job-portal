import { useState } from 'react';
import PropTypes from 'prop-types';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import tickImg from '../../assets/images/tick.svg';
import { DEFAULT_RATING, EMPTY_ARRAY } from '../../constants';
import UI from '../../constants/ui';
import ratingColor from '../../helpers/colorCode';
import { getRating } from '../../formatter/commonBootstrap';
import styles from './moreSkillsAndRating.module.css';
import {
  BLUETICK_HEIGHT,
  BLUETICK_WIDTH,
} from './moreSkillsAndRating.constant';

function MoreSkillsPopoverComponent(props) {
  const { skills } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Typography
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
        variant="span"
        className="caption color-5EADF"
      >
        +{skills.length} {UI.MORE}
      </Typography>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        <div className={styles.skillRatingPopover}>
          {skills.map((skillRating, index) => (
            <div className="d-flex my-2 mx-3" key={index}>
              <span className="col">{skillRating.name}</span>

              {skillRating.rating !== DEFAULT_RATING && (
                <span className={ratingColor(skillRating.rating)}>
                  {getRating(skillRating.rating)}
                </span>
              )}

              {skillRating.visibility && (
                <img
                  className="ms-2 align-self-center"
                  src={tickImg}
                  alt={UI.ALT_BLUETICK}
                  width={BLUETICK_WIDTH}
                  height={BLUETICK_HEIGHT}
                />
              )}
            </div>
          ))}
        </div>
      </Popover>
    </div>
  );
}

MoreSkillsPopoverComponent.propTypes = {
  skills: PropTypes.array,
};

MoreSkillsPopoverComponent.defaultProps = {
  skills: EMPTY_ARRAY,
};

export default MoreSkillsPopoverComponent;
