enum EDataItemAttr {
  textInput = "text-input",
  select = "select",
  selectInput = "select-input",
  selectList = "select-list",
  selectListOption = "select-list-option",
  sideMenu = "side-menu"
}

const dataItemAttr = (attribute: EDataItemAttr) => ({ ["data-item"]: attribute });

export { dataItemAttr, EDataItemAttr };
