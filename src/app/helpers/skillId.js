import { getSkillList } from '../formatter/commonBootstrap';
import { DEFAULT_SKILL_ID } from '../constants';

export const getSkill = (skill) =>
  getSkillList().find(
    (skillId) => skillId.value.toLowerCase() === skill?.toLowerCase()
  );

export function extractSkillId(skill) {
  return getSkill(skill)?.id || DEFAULT_SKILL_ID;
}
