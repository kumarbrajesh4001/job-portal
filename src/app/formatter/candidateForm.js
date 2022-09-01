import UI from '../constants/ui';

export const getPresentFormatter = (isPresent) =>
  isPresent ? `${UI.AT_PRESENT} ` : UI.NO;

export const getVisibilityFormatter = (visibility) =>
  visibility ? UI.YES : UI.NO;
