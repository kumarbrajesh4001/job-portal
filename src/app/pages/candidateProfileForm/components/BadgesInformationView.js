import React, { useState } from 'react';

import {
  IconButton,
  Menu,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import UI from '../../../constants/ui';
import COMMON_STYLE from '../../../constants/commonStyle';
import useMobileDevice from '../../../hooks/useMobileDevice';

const BADGES_ICONS = [
  [
    '/images/Developer_Expert.svg',
    '/images/Developer_Proficient.svg',
    '/images/Developer_Intermediate.svg',
    '/images/Developer_Beginner.svg',
  ],
  [
    '/images/SoftSkills_Expert.svg',
    '/images/SoftSkills_Proficient.svg',
    '/images/SoftSkills_Intermediate.svg',
    '/images/SoftSkills_Beginner.svg',
  ],
  [
    '/images/Technical_Expert.svg',
    '/images/Technical_Proficient.svg',
    '/images/Technical_Intermediate.svg',
    '/images/Technical_Beginner.svg',
  ],
];
const SKILLS_TYPES = ['Technical', 'Soft Skills', 'Developer'];

function BadgesInformationView() {
  const isMobileDevice = useMobileDevice();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <InfoOutlinedIcon sx={COMMON_STYLE.BADDGE_ICON_I_BTN} />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Table
          onClick={handleClose}
          size="small"
          aria-label="a dense table"
          style={{ zoom: isMobileDevice && 0.75 }}
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">{UI.SKILLS}</TableCell>
              <TableCell align="center">{UI.EXPERT}</TableCell>
              <TableCell align="center">{UI.PROFICIENT}</TableCell>
              <TableCell align="center">{UI.INTERMEDIATE}</TableCell>
              <TableCell align="center">{UI.BEGINNER}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {BADGES_ICONS?.map((skillBadges, index) => (
              <TableRow
                key={index}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell align="center">{SKILLS_TYPES[index]}</TableCell>
                {skillBadges.map((ratingIcon, i) => (
                  <TableCell key={i} align="center">
                    <img
                      src={ratingIcon}
                      alt={UI.ALT_BADGE}
                      style={COMMON_STYLE.BADGE_ICON_FOR_TABLE}
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Menu>
    </>
  );
}

export default BadgesInformationView;
