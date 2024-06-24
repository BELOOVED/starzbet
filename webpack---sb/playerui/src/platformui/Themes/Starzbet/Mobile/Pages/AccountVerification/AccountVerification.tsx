// @ts-nocheck
/* eslint-disable rulesdir/jsx-element-max-length */
import clsx from "clsx";
import { memo, useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_accountVerification_button_upload,
  platformui_starzbet_accountVerification_button_uploadedFiles,
  platformui_starzbet_accountVerification_contact_text,
  platformui_starzbet_accountVerification_failed_reason1,
  platformui_starzbet_accountVerification_failed_reason2,
  platformui_starzbet_accountVerification_failed_reason3,
  platformui_starzbet_accountVerification_title_identity_failed,
  platformui_starzbet_accountVerification_title_yourAccountHasBeenApproved,
  platformui_starzbet_accVerification_about,
  platformui_starzbet_accVerification_clickToUpload,
  platformui_starzbet_accVerification_documentType,
  platformui_starzbet_accVerification_history,
  platformui_starzbet_accVerification_reasonForRejection,
  platformui_starzbet_accVerification_verification,
  platformui_starzbet_button_submit,
  platformui_starzbet_footer_accountVerification,
  platformui_starzbet_navLink_myAccount,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { getNotNil, not, type TVoidFn, useParamSelector, withCondition } from "@sb/utils";
import { EPlatform_KycDocumentTypeEnum, EPlatform_KycStatusCodeEnum } from "@sb/graphql-client";
import { platformui_kyc_button_addFile, platformui_subTitle_wrong } from "@sb/translates/platformui/CommonTKeys";
import type { TPlatform_KycDocument_Fragment } from "@sb/graphql-client/PlayerUI";
import { PlayerUIQaAttributes, qaAttr } from "@sb/qa-attributes";
import { sportsbookui_starzbet_subTitle_complete } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./AccountVerification.module.css";
import {
  RedirectLocalized,
} from "../../../../../../common/Client/Core/Services/RouterService/Components/RedirectLocalized/RedirectLocalized";
import { WarningIcon } from "../../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Icons/WarningIcon/WarningIcon";
import { BaseModalCreator, type TWithHideModal } from "../../../../../../common/Components/BaseModalCreator/BaseModalCreator";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { useDateFormat } from "../../../../../../common/Utils/ComponentsUtils/UseDateFormat";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { handleImageOpen } from "../../../../../Utils/HandleImageOpen";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { useGetAddFilesHelpers } from "../../../../../Store/Kyc/Hooks/UseGetAddFilesHelpers";
import {
  isKycDocumentRequiredSelector,
  isKycDocumentsNotEmptySelector,
  isKycDocumentsRequiredOrAlreadySentSelector,
  kycDocumentsSortedSelector,
  kycStatusCodeSelector,
} from "../../../../../Store/Kyc/Selectors/PlayerKycSelectors";
import { TranslateRecord } from "../../../../../Components/TranslateRecord/TranslateRecord";
import { AcceptedFormatsCard } from "../../../Components/AcceptedFormatsCard/AcceptedFormatsCard";
import { CompleteMessage } from "../../../Components/CompleteMessage/CompleteMessage";
import { kycStatusTranslateMap, proofIsRequiredTranslateMap, proofTranslateMap } from "../../../Model/KycTranslateMaps";
import { ThemedModalHeader } from "../../../Components/ThemedModal/ThemedModalHeader/ThemedModalHeader";
import { ThemedModalBody } from "../../../Components/ThemedModal/ThemedModalBody/ThemedModalBody";
import { ThemedModal } from "../../../Components/ThemedModal/ThemedModal";
import { ThemedModalText } from "../../../Components/ThemedModal/ThemedModalText/ThemedModalText";
import { ThemedModalErrorMessage, ThemedModalSuccessMessage } from "../../../Components/ThemedModal/ThemedModalPrefabs/ThemedModalMessage";
import { ThemedModalButtonsRow } from "../../../Components/ThemedModal/ThemedModalButtonsRow/ThemedModalButtonsRow";
import { ThemedModalButton } from "../../../Components/ThemedModal/ThemedModalButton/ThemedModalButton";
import { NewTabIcon } from "../../../Components/Icons/NewTabIcon/NewTabIcon";
import { VerifiedIcon } from "../../../Components/Icons/VerifiedIcon/VerifiedIcon";
import { AccountPage } from "../../Components/AccountPage/AccountPage";
import { type TPageHeaderSourceMap } from "../../Components/PageHeader/PageHeader";

const statusClassNameMap: Record<EPlatform_KycStatusCodeEnum, string> = {
  [EPlatform_KycStatusCodeEnum.approved]: classes.approved,
  [EPlatform_KycStatusCodeEnum.declined]: classes.declined,
  [EPlatform_KycStatusCodeEnum.pending]: classes.pending,
};

const KycStatus = memo(() => {
  const [t] = useTranslation();

  const statusCode = useSelector(kycStatusCodeSelector);

  return (
    <>
      {
        statusCode === EPlatform_KycStatusCodeEnum.approved
          ? (
            <CompleteMessage
              reason={t(platformui_starzbet_accountVerification_title_yourAccountHasBeenApproved)}
              qaAttribute={PlayerUIQaAttributes.VerificationPage.VerificationStatus}
            />
          )
          : null
      }

      {
        statusCode === EPlatform_KycStatusCodeEnum.declined
          ? (
            <div className={classes.accountStatus}>
              <div className={classes.declinedTitle} {...qaAttr(PlayerUIQaAttributes.VerificationPage.VerificationStatus)}>
                {t(platformui_starzbet_accountVerification_title_identity_failed)}
              </div>

              <ul className={classes.declinedList}>
                <li>{t(platformui_starzbet_accountVerification_failed_reason1)}</li>

                <li>{t(platformui_starzbet_accountVerification_failed_reason2)}</li>

                <li>{t(platformui_starzbet_accountVerification_failed_reason3)}</li>
              </ul>

              <div className={classes.contact}>
                {t(platformui_starzbet_accountVerification_contact_text)}
              </div>
            </div>
          )
          : null
      }
    </>
  );
});
KycStatus.displayName = "KycStatus";

const AddedFile = memo((
  {
    image,
    removeFile,
    filename,
    setFileType,
    type,
  },
) => {
  const deleteFile = (e) => {
    e.stopPropagation();
    removeFile();
  };

  const openImage = () => handleImageOpen(image, filename);

  useEffect(
    () => {
      setFileType(type);
    },
    [],
  );

  return (
    <div className={classes.fileContainer} onClick={openImage}>
      <div className={classes.file}>
        <div className={classes.fileName}>
          <Ellipsis>{filename}</Ellipsis>
        </div>

        <div className={classes.fileOptionsContainer}>
          <button
            className={classes.removeAddedFileButton}
            onClick={deleteFile}
          />
        </div>
      </div>
    </div>
  );
});
AddedFile.displayName = "AddedFile";

const VerificationModal = memo(
  ({
    files,
    onUploadClick,
    setFileType,
    removeFile,
    FileUploader,
    closeHandler,
    type,
    toggleFlag,
  }) => {
    const onUploadWidthCloseClick = () => {
      onUploadClick();
      closeHandler();
      toggleFlag();
    };
    const [t] = useTranslation();

    return (
      <ThemedModal onCancel={closeHandler}>
        <ThemedModalHeader closeButtonClickHandler={closeHandler}>
          <ThemedModalText color={"white"} size={"lg"}>
            {t(platformui_starzbet_accountVerification_button_uploadedFiles)}
          </ThemedModalText>
        </ThemedModalHeader>

        <ThemedModalBody>
          <div className={classes.modalUpload} {...qaAttr(PlayerUIQaAttributes.VerificationPage.FileUploadButton)}>
            {
              files.length > 0
                ? (
                  <div className={classes.addedFilesContainer}>
                    {
                      files.map((file, index) => (
                        <AddedFile
                          {...file}
                          key={file.filename}
                          index={index}
                          setFileType={setFileType(index)}
                          removeFile={removeFile(index)}
                          type={type}
                        />
                      ))
                    }
                  </div>
                )
                : (
                  <div className={classes.fileUploaderWrapper}>
                    <FileUploader className={classes.fileUploader}>
                      {t(platformui_kyc_button_addFile)}
                    </FileUploader>

                    <div
                      className={classes.uploaderText}
                    >
                      {t(platformui_starzbet_accVerification_clickToUpload)}
                    </div>
                  </div>
                )
            }
          </div>

          <AcceptedFormatsCard />
        </ThemedModalBody>

        <ThemedModalButtonsRow>
          <ThemedModalButton
            disabled={files.length === 0}
            onClick={onUploadWidthCloseClick}
            qaAttribute={PlayerUIQaAttributes.Modal.SubmitButton}
          >
            {t(platformui_starzbet_button_submit)}
          </ThemedModalButton>
        </ThemedModalButtonsRow>
      </ThemedModal>
    );
  },
);
VerificationModal.displayName = "VerificationModal";

interface IRequestedDocumentsProps {
  type: EPlatform_KycDocumentTypeEnum;
  onUpload: TVoidFn;
}

const RequestedDocuments = memo<IRequestedDocumentsProps>(({
  type,
  onUpload,
  qaAttributeUploadButton,
  qaAttributeWarningTitle,
  qaAttributeWarningMessage,
}) => {
  const [t] = useTranslation();

  const isRequested = useParamSelector(isKycDocumentRequiredSelector, [type]);

  if (!isRequested) {
    return null;
  }

  return (
    <div className={classes.requestedContainer}>
      <div className={classes.warningText} {...qaAttr(qaAttributeWarningTitle)}>
        <WarningIcon
          width={22}
          height={22}
          color={"warning"}
        />

        {t(proofIsRequiredTranslateMap[type])}
      </div>

      <div {...qaAttr(qaAttributeWarningMessage)}>
        {t(platformui_starzbet_accVerification_about)}
      </div>

      <Button
        onClick={onUpload}
        colorScheme={"orange-gradient"}
        qaAttribute={qaAttributeUploadButton}
        wide
      >
        {t(platformui_starzbet_accountVerification_button_upload)}
      </Button>
    </div>
  );
});
RequestedDocuments.displayName = "RequestedDocuments";

interface IKycDocumentProps {
  document: TPlatform_KycDocument_Fragment;
}

const KycDocumentDeclineInfo = memo<IKycDocumentProps & TWithHideModal>(({ document, hideModal }) => {
  const [t] = useTranslation();
  const formattedDate = useDateFormat(document.status.createdAt, "dd.LL.yyyy HH:mm:ss");

  const reason = getNotNil(document.rejectionNotes[0], ["KycDocumentDeclineInfo"], "rejectionNotes[0]").note;

  return (
    <ThemedModal onCancel={hideModal}>
      <ThemedModalHeader closeButtonClickHandler={hideModal}>
        <ThemedModalText color={"error"} size={"lg"}>
          {t(kycStatusTranslateMap[EPlatform_KycStatusCodeEnum.declined])}
        </ThemedModalText>
      </ThemedModalHeader>

      <ThemedModalBody className={classes.rejectInfoModal}>
        <div className={classes.declineInfoContent}>
          <div className={classes.modalDocumentTitle} {...qaAttr(PlayerUIQaAttributes.VerificationPage.RejectInfoModal_RejectionDateTime)}>
            {formattedDate}
          </div>

          <div
            className={classes.modalDocumentBody} {...qaAttr(PlayerUIQaAttributes.VerificationPage.RejectInfoModal_DocumentType)}
          >
            <span>
              {t(platformui_starzbet_accVerification_documentType)}

              {": "}
            </span>

            <span>
              {t(proofTranslateMap[document.type])}
            </span>
          </div>
        </div>

        <div className={clsx(classes.declineInfoContent, classes.footer)}>
          <div className={classes.modalDocumentTitle}>
            {t(platformui_starzbet_accVerification_reasonForRejection)}

            {": "}
          </div>

          <div
            className={classes.modalDocumentBody}
            {...qaAttr(PlayerUIQaAttributes.VerificationPage.RejectInfoModal_ReasonForRejection)}
          >
            <TranslateRecord record={reason} />
          </div>
        </div>
      </ThemedModalBody>
    </ThemedModal>
  );
});
KycDocumentDeclineInfo.displayName = "KycDocumentDeclineInfo";

const getModal = (document: TPlatform_KycDocument_Fragment) => (hideModal: TVoidFn) =>
  <KycDocumentDeclineInfo document={document} hideModal={hideModal} />;

const KycDocument = memo<IKycDocumentProps>(({ document }) => {
  const [t] = useTranslation();

  const formattedDate = useDateFormat(document.createdAt, "dd.LL.yyyy HH:mm:ss");

  return (
    <BaseModalCreator modal={getModal(document)}>
      {
        (toggleModal) => (
          <div
            className={classes.documentContainer}
            onClick={document.status.code === EPlatform_KycStatusCodeEnum.declined ? toggleModal : undefined}
          >
            <div className={classes.documentContent}>
              <div className={classes.documentTitle} {...qaAttr(PlayerUIQaAttributes.VerificationPage.History_UploadDateTime)}>
                {formattedDate}
              </div>

              <div
                className={classes.documentBody} {...qaAttr(PlayerUIQaAttributes.VerificationPage.History_DocumentType)}
              >
                <span>
                  {t(platformui_starzbet_accVerification_documentType)}

                  {": "}
                </span>

                <span>
                  {t(proofTranslateMap[document.type])}
                </span>
              </div>
            </div>

            <div className={classes.documentExtra}>
              <div
                className={statusClassNameMap[document.status.code]}
                {...qaAttr(PlayerUIQaAttributes.VerificationPage.History_DocumentStatus)}
              >
                {t(kycStatusTranslateMap[document.status.code])}
              </div>

              {
                document.status.code === EPlatform_KycStatusCodeEnum.declined
                  ? (
                    <NewTabIcon {...qaAttr(PlayerUIQaAttributes.VerificationPage.History_InfoButton)} />
                  )
                  : null
              }
            </div>
          </div>
        )
      }
    </BaseModalCreator>
  );
});
KycDocument.displayName = "KycDocument";

const KycDocuments = withCondition(
  isKycDocumentsNotEmptySelector,
  memo(() => {
    const [t] = useTranslation();
    const documents = useSelector(kycDocumentsSortedSelector);

    return (
      <div>
        <div className={classes.documentsTitle}>
          {t(platformui_starzbet_accVerification_history)}
        </div>

        <div className={classes.documentsContainer}>
          {
            documents.map((it) => (
              <KycDocument document={it} key={it.id} />
            ))
          }
        </div>
      </div>
    );
  }),
);
KycDocuments.displayName = "KycDocuments";

const getVerificationModal = (files, FileUploader, handleUploadClick, removeFile, setFileType, type, toggleFlag) => (toggle: TVoidFn) => (
  <VerificationModal
    files={files}
    FileUploader={FileUploader}
    onUploadClick={handleUploadClick}
    removeFile={removeFile}
    setFileType={setFileType}
    type={type}
    closeHandler={toggle}
    toggleFlag={toggleFlag}
  />
);

const completeSubtitle = [sportsbookui_starzbet_subTitle_complete];
const errorSubtitle = [platformui_subTitle_wrong];

const RequestedDocumentModal = memo<Pick<IRequestedDocumentsProps, "type">>(({
  type,
  qaAttributeUploadButton,
  qaAttributeWarningTitle,
  qaAttributeWarningMessage,
}) => {
  const [flag, toggleFlag] = useReducer(not<boolean>, false);

  const {
    files,
    setFileType,
    removeFile,
    handleUploadClick,
    failedUploads,
    successfulUploads,
    FileUploader,
  } = useGetAddFilesHelpers(type);

  return (
    <BaseModalCreator
      modal={getVerificationModal(files, FileUploader, handleUploadClick, removeFile, setFileType, type, toggleFlag)}
    >
      {
        (toggle) => (
          <>
            <RequestedDocuments
              type={type}
              onUpload={toggle}
              qaAttributeUploadButton={qaAttributeUploadButton}
              qaAttributeWarningTitle={qaAttributeWarningTitle}
              qaAttributeWarningMessage={qaAttributeWarningMessage}
            />

            {
              successfulUploads && flag &&
              <ThemedModalSuccessMessage hideModal={toggleFlag} subtitle={completeSubtitle} />
            }

            {
              failedUploads && flag &&
              <ThemedModalErrorMessage hideModal={toggleFlag} subtitle={errorSubtitle} />
            }
          </>
        )
      }
    </BaseModalCreator>
  );
});
RequestedDocumentModal.displayName = "RequestedDocumentModal";

const Content = memo(() => (
  <div className={classes.content} {...qaAttr(PlayerUIQaAttributes.VerificationPage.FormContainer)}>
    <div className={classes.wrapper}>
      <KycStatus />

      <RequestedDocumentModal
        type={EPlatform_KycDocumentTypeEnum.id}
        qaAttributeUploadButton={PlayerUIQaAttributes.VerificationPage.UploadProofOfIdentityButton}
        qaAttributeWarningTitle={PlayerUIQaAttributes.VerificationPage.ProofOfIdentityRequestTitle}
        qaAttributeWarningMessage={PlayerUIQaAttributes.VerificationPage.ProofOfIdentityRequestMessage}
      />

      <RequestedDocumentModal
        type={EPlatform_KycDocumentTypeEnum.proofOfAddress}
        qaAttributeUploadButton={PlayerUIQaAttributes.VerificationPage.UploadProofOfAddressButton}
        qaAttributeWarningTitle={PlayerUIQaAttributes.VerificationPage.ProofOfAddressRequestTitle}
        qaAttributeWarningMessage={PlayerUIQaAttributes.VerificationPage.ProofOfAddressRequestMessage}
      />
    </div>

    <KycDocuments />
  </div>
));
Content.displayName = "Content";

const AccountVerificationBase = memo(() => {
  const pageVisible = useParamSelector(isKycDocumentsRequiredOrAlreadySentSelector, ["AccountVerification"]);

  if (!pageVisible) {
    return <RedirectLocalized to={routeMap.root} />;
  }

  return (
    <Content />
  );
});
AccountVerificationBase.displayName = "AccountVerificationBase";

const headerRouteMap: TPageHeaderSourceMap = [
  {
    titleTKey: platformui_starzbet_navLink_myAccount,
    path: routeMap.myAccountRoute,
  },
  {
    titleTKey: platformui_starzbet_accVerification_verification,
  },
];

const AccountVerification = memo(() => {
  const [t] = useTranslation();

  return (
    <AccountPage
      icon={VerifiedIcon}
      routeMap={headerRouteMap}
      backPath={routeMap.myAccountRoute}
      title={t(platformui_starzbet_footer_accountVerification)}
      headerColorScheme={"orange-gradient"}
    >
      <AccountVerificationBase />
    </AccountPage>
  );
});
AccountVerification.displayName = "AccountVerification";

export { AccountVerification };
