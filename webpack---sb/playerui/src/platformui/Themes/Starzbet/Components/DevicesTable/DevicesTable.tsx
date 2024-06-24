import clsx from "clsx";
import { memo, useReducer } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import type { TPlatform_SelfPlayerDevices_Fragment } from "@sb/graphql-client/PlayerUI";
import { type EAlpha3Code, not, type TVoidFn } from "@sb/utils";
import {
  platformui_starzbet_myAccount_devices_actions,
  platformui_starzbet_myAccount_devices_browser,
  platformui_starzbet_myAccount_devices_current,
  platformui_starzbet_myAccount_devices_device,
  platformui_starzbet_myAccount_devices_ipAddress,
  platformui_starzbet_myAccount_devices_location,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { alpha3CodeTKeys } from "@sb/betting-core/SharedTKeys/Alpha3CodeTKeys";
import classes from "./DevicesTable.module.css";
import { IS_MOBILE_CLIENT_SIDE } from "../../../../../common/Store/DeviceInfo/DeviceInfoConstant";
import { TrashIcon } from "../../../../../common/Themes/Starzbet/Components/Icons/TrashIcon/TrashIcon";
import { TickIcon } from "../../../../../common/Themes/Starzbet/Components/Icons/TickIcon/TickIcon";
import { currentDeviceSelector, playerDevicesSelector } from "../../../../Store/VerifyDevice/VerifyDeviceSelectors";
import { Ellipsis } from "../../../../Components/Ellipsis/Ellipsis";
import { UnionIcon } from "../Icons/UnionIcon/UnionIcon";
import { WarningDeviceIcon } from "../Icons/WarningDeviceIcon";
import { DeviceInfoModal } from "./DeviceInfoModal/DeviceInfoModal";
import { PromptModal } from "./DeviceInfoModal/PromptModal";

const TableHeader = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={clsx(classes.tableHeader, classes.tableRow)}>
      <span>{t(platformui_starzbet_myAccount_devices_device)}</span>

      {
        !IS_MOBILE_CLIENT_SIDE
          ? (
            <>
              <span>{t(platformui_starzbet_myAccount_devices_ipAddress)}</span>

              <span>{t(platformui_starzbet_myAccount_devices_browser)}</span>

              <span>{t(platformui_starzbet_myAccount_devices_location)}</span>
            </>
          )
          : null
      }

      <span>{t(platformui_starzbet_myAccount_devices_actions)}</span>
    </div>
  )
  ;
});
TableHeader.displayName = "TableHeader";

interface IRowControlProps {
  openModal: TVoidFn;
  removeDevice: TVoidFn;
}

const RowControls = memo<IRowControlProps>(({ openModal, removeDevice }) => (
  <div className={classes.rowControls}>
    <button onClick={openModal} className={classes.button}>
      <UnionIcon />
    </button>

    <button onClick={removeDevice} className={classes.button}>
      <TrashIcon />
    </button>
  </div>
));
RowControls.displayName = "RowControls";

interface ICurrentLabelProps {
  device: string;
}

const CurrenLabel = memo<ICurrentLabelProps>(({ device }) => {
  const [t] = useTranslation();

  return (
    <Ellipsis className={classes.label}>
      <span>{t(platformui_starzbet_myAccount_devices_current)}</span>

      <span>{": "}</span>

      <span>{device}</span>
    </Ellipsis>
  );
});
CurrenLabel.displayName = "CurrenLabel";

type TTableRowProps = Omit<TPlatform_SelfPlayerDevices_Fragment, "__typename"> & {
  isCurrent: boolean;
}

const TableRow = memo<TTableRowProps>((props) => {
  const [modal, toggleModal] = useReducer(not<boolean>, false);
  const [remove, toggleRemove] = useReducer(not<boolean>, false);

  const [t] = useTranslation();

  const {
    browser,
    device,
    countryCode,
    hostAddress,
    verified,
    id,
    isCurrent,
  } = props;

  const countryKey = countryCode ? alpha3CodeTKeys[countryCode as EAlpha3Code] : "-";

  return (
    <div className={classes.tableRow}>
      <div className={classes.device}>
        {verified ? <TickIcon color={"verified"} /> : <WarningDeviceIcon />}

        <span className={isCurrent ? classes.online : undefined}>{device}</span>
      </div>

      {
        !IS_MOBILE_CLIENT_SIDE
          ? (
            <>
              <span className={classes.hostAddress}>{hostAddress}</span>

              <span>{browser}</span>

              <span>{t(countryKey)}</span>
            </>
          )
          : null
      }

      <RowControls openModal={toggleModal} removeDevice={toggleRemove} />

      {
        modal
          ? (
            <DeviceInfoModal
              {...props}
              countryKey={countryKey}
              closeModal={toggleModal}
            />
          )
          : null
      }

      {remove ? <PromptModal closeModal={toggleRemove} id={id} /> : null}
    </div>
  );
});
TableRow.displayName = "TableRow";

const DevicesTable = memo(() => {
  const devices = useSelector(playerDevicesSelector);
  const currentDevice = useSelector(currentDeviceSelector);

  if (!devices) {
    return null;
  }

  return (
    <div className={classes.devicesTable}>
      {currentDevice ? <CurrenLabel device={currentDevice.device} /> : null}

      <TableHeader />

      <div>
        {
          devices.map((device) => (
            <TableRow
              {...device}
              key={device.id}
              isCurrent={currentDevice?.id === device.id}
            />
          ))
        }
      </div>
    </div>
  );
});
DevicesTable.displayName = "DevicesTable";

export { DevicesTable };
