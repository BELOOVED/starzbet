import { withAttrPrefixFactory } from "../../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui__verification");

class VerificationPageKeys {
  static FormContainer = withAttr("form_container");

  static VerificationStatus = withAttr("title", "verification_status");

  // Requests section
  static ProofOfIdentityRequestTitle = withAttr("title", "proof_of_identity_request");
  static ProofOfIdentityRequestMessage = withAttr("message", "proof_of_identity_request");
  static UploadProofOfIdentityButton = withAttr("button", "upload_proof_of_identity");

  static ProofOfAddressRequestTitle = withAttr("title", "proof_of_address_request");
  static ProofOfAddressRequestMessage = withAttr("message", "proof_of_address_request");
  static UploadProofOfAddressButton = withAttr("button", "upload_proof_of_address");

  // History section
  static History_DocumentType = withAttr("history", "document_type");
  static History_UploadDateTime = withAttr("history", "upload_date_time");
  static History_DocumentStatus = withAttr("history", "document_status");
  static History_InfoButton = withAttr("history", "info_button");

  // 'Upload Document' modal
  static FileUploadButton = withAttr("button", "file_upload");

  // Reject Info modal
  static RejectInfoModal_DocumentStatus = withAttr("reject_info_modal", "document_status");
  static RejectInfoModal_DocumentType = withAttr("reject_info_modal", "document_type");
  static RejectInfoModal_RejectionDateTime = withAttr("reject_info_modal", "rejection_date_time");
  static RejectInfoModal_ReasonForRejection = withAttr("reject_info_modal", "reason_for_rejection");
}

export { VerificationPageKeys };
