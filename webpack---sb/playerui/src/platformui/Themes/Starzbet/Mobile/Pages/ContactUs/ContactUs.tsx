/* eslint-disable rulesdir/jsx-element-max-length */
import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "@sb/translator";
import {
  platformui_starzbet_contactUs_liveChatText,
  platformui_starzbet_contactUs_online,
  platformui_starzbet_contactUs_startChat,
  platformui_starzbet_navLink_contactUs,
  platformui_starzbet_navLink_liveChat,
  platformui_starzbet_navLink_myAccount,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { isNil, isNotNil, isNotVoid, useParamSelector, withCondition } from "@sb/utils";
import type {
  TCms_ContactUsProfileBlockCallUsContent_Type_Fragment,
  TCms_ContactUsProfileBlockCallUsElementContent_Type_Fragment,
  TCms_ContactUsProfileBlockContent_Union_Fragment,
  TCms_ContactUsProfileBlockEmailsContent_Type_Fragment,
  TCms_ListWithMultiLangContent_Type_Fragment,
} from "@sb/graphql-client/CmsUI";
import classes from "./ContactUs.module.css";
import { Text } from "../../../../../../common/Themes/Starzbet/Components/Text/Text";
import { Button } from "../../../../../../common/Themes/Starzbet/Components/Button/Button";
import { openChatComm100 } from "../../../../../../common/Integrations/Comm100API/OpenChatComm100";
import { routeMap } from "../../../../../RouteMap/RouteMap";
import { isContactUsCallsList, isContactUsEmailsList, isThemeImage } from "../../../../../Store/CMS/Utils/TypeGuards";
import {
  cmsContactUsConditionSelector,
  cmsContactUsContactUsContentSelector,
  cmsContactUsDescriptionSelector,
  cmsContactUsTitleSelector,
} from "../../../../../Store/CMS/Selectors/CMSContactUsSelectors";
import { CMSImage } from "../../../../../Components/CMSComponents/CMSFiles/CMSFiles";
import { getPayloadWithCorrectValueFromDataAttrSelector } from "../../../../../Store/CMS/Selectors/CMSSelectors";
import { useCorrectTextByLocale } from "../../../../../Hooks/UseCorrectTextByLocale";
import { extractTextFromSpans } from "../../../../../Components/CMSComponents/CMSText/Helpers";
import { MultiLangText } from "../../../../../Components/CMSComponents/CMSText/MultiLangText/MultiLangText";
import { Copy } from "../../../Components/Copy/Copy";
import { HelpIcon } from "../../../Components/Icons/HelpIcon/HelpIcon";
import { ChatIcon } from "../../../Components/Icons/ChatIcon/ChatIcon";
import { AccountPage } from "../../Components/AccountPage/AccountPage";
import { type TPageHeaderSourceMap } from "../../Components/PageHeader/PageHeader";

interface IContactUsEmail {
  content: TCms_ListWithMultiLangContent_Type_Fragment;
}

const ContactUsEmail = memo<IContactUsEmail>(({ content }) => {
  const contentWithCorrectValue = useParamSelector(getPayloadWithCorrectValueFromDataAttrSelector, [content.description]);

  const translate = useCorrectTextByLocale(contentWithCorrectValue);

  if (isNil(translate)) {
    return null;
  }

  const text = extractTextFromSpans(translate);

  return (
    <Text
      colorScheme={"blue-text"}
      textSize={"18"}
      textGap={"24"}
      textWeight={"500"}
      className={clsx(classes.bottomRowItem, classes.ellipsisWrapper)}
    >
      <span className={classes.emailText}>
        {text}
      </span>

      <Copy text={text} />
    </Text>
  );
});
ContactUsEmail.displayName = "ContactUsEmail";

interface IContactUsEmailWrapper {
  content: TCms_ContactUsProfileBlockEmailsContent_Type_Fragment;
}

const ContactUsEmailsWrapper = memo<IContactUsEmailWrapper>(({ content }) => {
  const title = content.title;

  const image = content.logoImage?.image;

  const emailsList = content.emails?.content;

  const contentWithCorrectValue = useParamSelector(getPayloadWithCorrectValueFromDataAttrSelector, [title?.description]);

  const translate = useCorrectTextByLocale(contentWithCorrectValue);

  const text = isNotNil(translate) ? extractTextFromSpans(translate) : null;

  return (
    <div className={classes.generalBlock}>
      {
        isNotVoid(text) || isThemeImage(image)
          ? (
            <div className={classes.imageTextWrapper}>
              <CMSImage img={image} className={classes.tgImage} />

              <Text
                colorScheme={"text"}
                textSize={"24"}
                textGap={"32"}
                textWeight={"400"}
                capitalize
                className={classes.ellipsis}
              >
                {text}
              </Text>
            </div>
          )
          : null
      }

      {
        isNotNil(emailsList)
          ? (
            <div className={classes.bottomRow}>
              {emailsList.map((it, index) => isNotNil(it) ? <ContactUsEmail key={index} content={it} /> : null)}
            </div>
          )
          : null
      }
    </div>
  );
});
ContactUsEmailsWrapper.displayName = "ContactUsEmailsWrapper";

interface IContactCallUs {
  content: TCms_ContactUsProfileBlockCallUsElementContent_Type_Fragment;
}

const ContactCallUs = memo<IContactCallUs>(({ content }) => {
  const image = content.logoImage?.image;

  const phone = content.phoneNumber;

  return (
    <div className={classes.bottomRowItem}>
      <CMSImage img={image} className={classes.tgFilledImage} />

      <MultiLangText
        arr={content.title?.description}
        className={clsx(classes.callUsSubText, classes.textWrapper, classes.ellipsisWrapper)}
      />

      {
        isNotNil(phone)
          ? (
            <>
              {" "}

              <Text
                colorScheme={"blue-text"}
                textSize={"18"}
                textGap={"24"}
                textWeight={"500"}
                className={classes.emailText}
              >
                {phone}
              </Text>

              <Copy text={phone} />
            </>
          )
          : null
      }
    </div>
  );
});
ContactCallUs.displayName = "ContactCallUs";

interface IContactUsCalls {
  content: TCms_ContactUsProfileBlockCallUsContent_Type_Fragment;
}

const ContactUsCallsWrapper = memo<IContactUsCalls>(({ content }) => {
  const title = content.title;

  const contentWithCorrectValue = useParamSelector(getPayloadWithCorrectValueFromDataAttrSelector, [title?.description]);

  const translate = useCorrectTextByLocale(contentWithCorrectValue);

  const text = isNotNil(translate) ? extractTextFromSpans(translate) : null;

  const image = content.logoImage?.image;

  const callUsList = content.callUsList?.content;

  return (
    <div className={classes.generalBlock}>
      {
        isNotVoid(text) || isThemeImage(image)
          ? (
            <div className={classes.imageTextWrapper}>
              <CMSImage img={image} className={classes.tgImage} />

              <Text
                colorScheme={"text"}
                textSize={"24"}
                textGap={"32"}
                textWeight={"400"}
                capitalize
                className={classes.ellipsis}
              >
                {text}
              </Text>
            </div>
          )
          : null
      }

      {
        isNotNil(callUsList)

          ? (
            <div className={classes.bottomRow}>
              {callUsList.map((it, index) => isNotNil(it) ? <ContactCallUs key={index} content={it} /> : null)}
            </div>
          )
          : null
      }
    </div>
  );
});
ContactUsCallsWrapper.displayName = "ContactUsCallsWrapper";

interface IContactUsContent {
  content: TCms_ContactUsProfileBlockContent_Union_Fragment;
}

const ContactUsElementWrapper = memo<IContactUsContent>(({ content }) => {
  if (isContactUsEmailsList(content)) {
    return <ContactUsEmailsWrapper content={content} />;
  }

  if (isContactUsCallsList(content)) {
    return <ContactUsCallsWrapper content={content} />;
  }

  return null;
});
ContactUsElementWrapper.displayName = "ContactUsElementWrapper";

const ChatBlock = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.generalBlock}>
      <div className={classes.imageTextWrapper}>
        <ChatIcon size={"m"} className={classes.liveChatIcon} color={"text"} />

        <Text
          colorScheme={"text"}
          textSize={"24"}
          textGap={"32"}
          textWeight={"400"}
          capitalize
        >
          {t(platformui_starzbet_navLink_liveChat)}
        </Text>

        <div className={classes.bullet} />

        <Text
          colorScheme={"green-text"}
          textSize={"14"}
          textGap={"16"}
          textWeight={"400"}
          capitalize
        >
          {t(platformui_starzbet_contactUs_online)}
        </Text>
      </div>

      <Text
        colorScheme={"light-400"}
        textSize={"12"}
        textGap={"24"}
        textWeight={"500"}
        capitalize
      >
        {t(platformui_starzbet_contactUs_liveChatText)}
      </Text>

      <Button className={classes.submitButton} onClick={openChatComm100} colorScheme={"orange-gradient"}>
        {t(platformui_starzbet_contactUs_startChat)}
      </Button>
    </div>
  );
});
ChatBlock.displayName = "ChatBlock";

const headerRouteMap: TPageHeaderSourceMap = [
  {
    titleTKey: platformui_starzbet_navLink_myAccount,
    path: routeMap.myAccountRoute,
  },
  {
    titleTKey: platformui_starzbet_navLink_contactUs,
  },
];

const ContactUsContent = memo(() => {
  const title = useSelector(cmsContactUsTitleSelector);

  const description = useSelector(cmsContactUsDescriptionSelector);

  const content = useSelector(cmsContactUsContactUsContentSelector);

  const contentWithCorrectValue = useParamSelector(getPayloadWithCorrectValueFromDataAttrSelector, [title]);

  const translate = useCorrectTextByLocale(contentWithCorrectValue);

  const text = isNotNil(translate) ? extractTextFromSpans(translate) : null;

  return (
    <AccountPage
      backPath={routeMap.myAccountRoute}
      title={text}
      icon={HelpIcon}
      routeMap={headerRouteMap}
      headerColorScheme={"blue"}
    >
      <div className={classes.contactWrapper}>
        <MultiLangText arr={description} className={clsx(classes.subTitle, classes.ellipsisWrapper)} />

        {
          isNotNil(content)
            ? content.map((it, index) => isNotNil(it) ? <ContactUsElementWrapper key={index} content={it} /> : null)
            : null
        }

        {isNotNil(true) ? <ChatBlock /> : null}
      </div>
    </AccountPage>
  );
});
ContactUsContent.displayName = "ContactUsContent";

const ContactUsWrapper = withCondition(
  cmsContactUsConditionSelector,
  ContactUsContent,
);

export { ContactUsWrapper };
