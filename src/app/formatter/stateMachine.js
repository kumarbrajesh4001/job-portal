import keyBy from 'lodash/keyBy';
import ENUM_TYPE from '../constants/enumType';
import { getBootstrap } from './base.bootstrap';

const EMPLOYER_STATE_MACHINE_ENUM_NAME = {
  JOB_STATE: 'jobstate',
  CANDIDATE_TYPE: 'candidatetype',
};

const CANDIDATE_STATE_MACHINE_ENUM_NAME = {
  CANDIDATE_JOB_STATE: 'candjobstate',
  CANDIDATE_TYPE: 'candidatetype',
};

const getCandStateMachine = () => {
  const bootstrap = getBootstrap();
  const stateMachinesByName = keyBy(
    bootstrap?.[ENUM_TYPE.CANDIDATE_STATE_MACHINES],
    'enumName'
  );
  return stateMachinesByName;
};

const getEmpStateMachine = () => {
  const bootstrap = getBootstrap();
  const stateMachinesByName = keyBy(
    bootstrap?.[ENUM_TYPE.EMPLOYER_STATE_MACHINES],
    'enumName'
  );
  return stateMachinesByName;
};

const getCandStateMachineStates = (enumName, stateValue) =>
  getCandStateMachine()[enumName]?.smstates?.find(
    (smstate) => smstate.state === stateValue
  );

const getEmpStateMachineStates = (enumName, stateValue) =>
  getEmpStateMachine()[enumName]?.smstates?.find(
    (smstate) => smstate.state === stateValue
  );

export const getJobStateMachine = (stateValue) =>
  getEmpStateMachineStates(
    EMPLOYER_STATE_MACHINE_ENUM_NAME.JOB_STATE,
    stateValue
  );

export const getCandidateTypeMachine = (stateValue) =>
  getEmpStateMachineStates(
    EMPLOYER_STATE_MACHINE_ENUM_NAME.CANDIDATE_TYPE,
    stateValue
  );

export const getCandidateStateMachine = (stateValue) =>
  getCandStateMachineStates(
    CANDIDATE_STATE_MACHINE_ENUM_NAME.CANDIDATE_JOB_STATE,
    stateValue
  );

export const getCandidateStateMachineForCandidate = (stateValue) =>
  getCandStateMachineStates(
    CANDIDATE_STATE_MACHINE_ENUM_NAME.CANDIDATE_TYPE,
    stateValue
  );
