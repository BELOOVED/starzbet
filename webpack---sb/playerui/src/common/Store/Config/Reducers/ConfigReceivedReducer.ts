import type { TPlatform_Config_Fragment } from "@sb/graphql-client/PlayerUI";
import { type IWithConfigState } from "../ConfigInitialState";

interface IWithPayload {
  payload: {
    config: TPlatform_Config_Fragment;
  };
}

const configReceivedReducer = (state: IWithConfigState, { payload: { config } }: IWithPayload) => ({
  ...state,
  config,
});

export { configReceivedReducer };
