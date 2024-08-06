export const SET_RECIPIENT = "SET_RECIPIENT";
export const SET_TOTAL = "SET_TOTAL";
export const SET_DATE = "SET_DATE";
export const SET_ID_PHOTO = "SET_ID_PHOTO";
export const SET_DISTRIBUTION_PHOTO = "SET_DISTRIBUTION_PHOTO";
export const SET_DESCRIPTION = "SET_DESCRIPTION";

interface SetRecipientAction {
  type: typeof SET_RECIPIENT;
  payload: any;
}

interface SetTotalAction {
  type: typeof SET_TOTAL;
  payload: string;
}

interface SetDateAction {
  type: typeof SET_DATE;
  payload: Date;
}

interface SetIdPhotoAction {
  type: typeof SET_ID_PHOTO;
  payload: any;
}

interface SetDistributionPhotoAction {
  type: typeof SET_DISTRIBUTION_PHOTO;
  payload: any;
}

interface SetDescriptionAction {
  type: typeof SET_DESCRIPTION;
  payload: string;
}

export type DistributionActionTypes =
  | SetRecipientAction
  | SetTotalAction
  | SetDateAction
  | SetIdPhotoAction
  | SetDistributionPhotoAction
  | SetDescriptionAction;

export const setRecipient = (recipient: any): SetRecipientAction => ({
  type: SET_RECIPIENT,
  payload: recipient,
});

export const setTotal = (total: string): SetTotalAction => ({
  type: SET_TOTAL,
  payload: total,
});

export const setDate = (date: Date): SetDateAction => ({
  type: SET_DATE,
  payload: date,
});

export const setIdPhoto = (photo: any): SetIdPhotoAction => ({
  type: SET_ID_PHOTO,
  payload: photo,
});

export const setDistributionPhoto = (
  photo: any
): SetDistributionPhotoAction => ({
  type: SET_DISTRIBUTION_PHOTO,
  payload: photo,
});

export const setDescription = (description: string): SetDescriptionAction => ({
  type: SET_DESCRIPTION,
  payload: description,
});
