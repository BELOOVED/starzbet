// @ts-nocheck
import { Route, Switch } from "react-router-dom";
import { type FC, type PropsWithChildren } from "react";
import { objToComponent } from "@sb/utils";
import { MessagesProvider } from "@sb/messages/Components";
import "./Styles/Global.css";
import classes from "./MobileApp.module.css";
import { ThemeContainer } from "../../../../common/Components/ThemeContainer/ThemeContainer";
import { EModal } from "../../../../common/Store/Modal/Model/EModal";
import { Modal } from "../../../../sportsbookui/Containers/Modal/Modal";
import { Noop } from "../../../../common/Components/Noop/Noop";
import type { TPlatformAppProps } from "../../../../common/ConfigureApplication/ConfigureMixApp";
import { scrollToTop } from "../../../Utils/ScrollToTop";
import { STARZBET_VERIFY_DEVICE_ENABLE } from "../../../Store/VerifyDevice/EnableFlags";
import { RealityCheckModal } from "../Components/RealityCheckModal/RealityCheckModal";
import { MessagesModal } from "../Components/MessagesModal/MessagesModal";
import { AuthModal, TwoFactorAuthModal } from "../Components/AuthModalCreator/AuthModal/AuthModal";
import { UserMessageModal } from "../Components/UserMessage/UserMessageModal/UserMessageModal";
import { CMSBonusModalInfo } from "../Components/CMSComponents/BonusModalInfo/CMSBonusModalInfo";
import { BonusModals } from "../Components/Bonuses/Modals/BonusModals";
import { VipClubWelcomeModal } from "../Components/VipClub/Modals/VipClubWelcomeModal/VipClubWelcomeModal";
import { VipClubLevelUpModal } from "../Components/VipClub/Modals/VipClubLevelUpModal/VipClubLevelUpModal";
import { RemoveDeviceSuccess } from "../Components/DevicesTable/DeviceInfoModal/SuccessModal";
import { VerifyDeviceModal } from "../Components/AuthModalCreator/AuthModal/VerifyDeviceModal/VerifyDeviceModal";
import { CHANGE_PASSWORD_FORM_MODAL_MAP } from "../Components/ChangePasswordForm/ChangePasswordForm";
import { SwitchWithPlayGameRoutes } from "../Components/PlayGame/PlayGamePage";
import { InvalidFileModal } from "../Components/Tickets/InvalidFileModal/InvalidFileModal";
import { UPDATE_PHONE_NUMBER_MODAL_MAP } from "../Components/MyDetails/UpdatePhoneNumber/UpdatePhoneNumberModal";
import { UPDATE_EMAIL_MODAL_MAP } from "../Components/MyDetails/UpdateEmail/UpdateEmailModal";
import { PaymentAccountRemoveFormModal } from "../Components/PaymentAccountRemoveForm/PaymentAccountRemoveForm";
import { Header } from "./Components/Header/Header";
import { MainPage } from "./Pages/MainPage/MainPage";
import { LogoutMessage } from "./Components/LogoutMessage/LogoutMessage";
import { routes } from "./Routes/Routes";
import { PageContainer } from "./Components/PageContainer/PageContainer";
import { CMSNavBar } from "./Components/CMSComponents/CMSNavBar/CMSNavBar";

const {
  casino,
  liveCasino,
  games,
  availableBonuses,
  myBonuses,
  historyBonuses,
  bingo,
  parlayBay,
  cms,
  vipClub,
  ...REST_PAGES
} = routes;

const modalMap = {
  [EModal.auth]: <AuthModal />,
  [EModal.cmsPromo]: <CMSBonusModalInfo />,
  [EModal.vipClubWelcome]: <VipClubWelcomeModal />,
  [EModal.vipClubLevelUp]: <VipClubLevelUpModal />,
  [EModal.removeDevice]: <RemoveDeviceSuccess />,
  [EModal.invalidFile]: <InvalidFileModal />,
  [EModal.verifyDevice]: STARZBET_VERIFY_DEVICE_ENABLE ? <VerifyDeviceModal /> : <Noop />,
  ...CHANGE_PASSWORD_FORM_MODAL_MAP,
  ...UPDATE_PHONE_NUMBER_MODAL_MAP,
  ...UPDATE_EMAIL_MODAL_MAP,
  [EModal.paymentAccountRemove]: <PaymentAccountRemoveFormModal />,
};

const ROUTES_WITH_BONUSES = {
  ...REST_PAGES,
  availableBonuses,
  myBonuses,
  historyBonuses,
};

const MAIN_PAGES = [casino, liveCasino, games, bingo, parlayBay, cms, vipClub];

const Main: FC<PropsWithChildren<{
  isSportsbookHaveBonuses?: boolean;
}>> = ({ children, isSportsbookHaveBonuses }) => {
  const pages = isSportsbookHaveBonuses ? REST_PAGES : ROUTES_WITH_BONUSES;

  return (
    <div className={classes.mobileApp}>
      <Modal modalMap={modalMap} />

      <UserMessageModal />

      <BonusModals />

      <MessagesProvider component={MessagesModal} />

      <RealityCheckModal />

      <LogoutMessage />

      <TwoFactorAuthModal />

      <Header />

      <Route path={cms.path}>
        <CMSNavBar />
      </Route>

      <PageContainer>
        <Switch>
          {Object.values(pages).map(objToComponent("path")(Route))}

          <MainPage
            pages={MAIN_PAGES}
            isSportsbookHaveBonuses={isSportsbookHaveBonuses}
          >
            {children}
          </MainPage>
        </Switch>
      </PageContainer>
    </div>
  );
};
Main.displayName = "Main";

const MobileApp: FC<TPlatformAppProps> = ({ children, isSportsbookHaveBonuses = false }) => {
  scrollToTop();

  return (
    <ThemeContainer>
      <SwitchWithPlayGameRoutes>
        <Main isSportsbookHaveBonuses={isSportsbookHaveBonuses}>{children}</Main>
      </SwitchWithPlayGameRoutes>
    </ThemeContainer>

  );
};
MobileApp.displayName = "MobileApp";

export { MobileApp };
