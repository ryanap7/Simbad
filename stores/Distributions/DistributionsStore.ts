import {
  SET_RECIPIENT,
  SET_TOTAL,
  SET_DATE,
  SET_ID_PHOTO,
  SET_DISTRIBUTION_PHOTO,
  SET_DESCRIPTION,
  DistributionActionTypes,
} from "./DistributionActions";

export interface DistributionState {
  recipient: any;
  total: string;
  date: Date;
  idPhoto: any;
  distributionPhoto: any;
  description: string;
}

export const initialState: DistributionState = {
  recipient: null,
  total: "",
  date: new Date(),
  idPhoto: null,
  distributionPhoto: null,
  description: "",
};

export const distributionReducer = (
  state: DistributionState,
  action: DistributionActionTypes
): DistributionState => {
  switch (action.type) {
    case SET_RECIPIENT:
      return { ...state, recipient: action.payload };
    case SET_TOTAL:
      return { ...state, total: action.payload };
    case SET_DATE:
      return { ...state, date: action.payload };
    case SET_ID_PHOTO:
      return { ...state, idPhoto: action.payload };
    case SET_DISTRIBUTION_PHOTO:
      return { ...state, distributionPhoto: action.payload };
    case SET_DESCRIPTION:
      return { ...state, description: action.payload };
    default:
      return state;
  }
};
