import { withAttrPrefixFactory } from "../../../Utils/WithAttrPrefixFactory";

const withAttr = withAttrPrefixFactory("player_ui__request_call_back");

class RequestCallBackPageKeys {
  // Create Request form
  static DateSelect = withAttr("select", "date");

  static DepartmentSelect = withAttr("select", "department");
  static DepartmentOption = withAttr("option", "department");

  static TimePeriodSelect = withAttr("select", "time_period");
  static TimePeriodOption = withAttr("option", "time_period");

  static CallOptionSelect = withAttr("select", "call_option");
  static CallOptionOption = withAttr("option", "call_option");

  static CallOptionInput = withAttr("input", "call_option");
  static CallOptionInputFieldValidation = withAttr("input_field_validation", "call_option");

  static MessageTextArea = withAttr("text_area", "message");

  static SubmitButton = withAttr("button", "submit");

  // Created requests list
  static RequestTicket_Container = withAttr("request_ticket", "container");
  static RequestTicket_Header = withAttr("request_ticket", "header");
  static RequestTicket_Date = withAttr("request_ticket", "date");
  static RequestTicket_CallOption = withAttr("request_ticket", "call_option");
  static RequestTicket_Note = withAttr("request_ticket", "note");
  static RequestTicket_Department = withAttr("request_ticket", "department");
  static RequestTicket_Status = withAttr("request_ticket", "status");
  static RequestTicket_Message = withAttr("request_ticket", "message");
  static RequestTicket_QRCode = withAttr("request_ticket", "qr_code");
  static RequestTicket_CancelButton = withAttr("request_ticket", "close_button");
}

export { RequestCallBackPageKeys };
