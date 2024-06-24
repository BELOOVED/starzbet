import { memo, useRef } from "react";
import { isArray, isNil, isNotVoid, useParamSelector } from "@sb/utils";
import classes from "./CMSPage.module.css";
import { CollapseIcon } from "../../../../../../../common/Themes/Starzbet/Components/Icons/CollapseIcon/CollapseIcon";
import type { ICMSPage } from "../../../../../../Store/CMS/Model/CmsModel";
import { isSimplePageBlockContent } from "../../../../../../Store/CMS/Utils/TypeGuards";
import { CMSPageContentByPageIdSelector } from "../../../../../../Store/CMS/Selectors/CMSPageContentSelectors";
import { CMSImage } from "../../../../../../Components/CMSComponents/CMSFiles/CMSFiles";
import { MultiLangText } from "../../../../../../Components/CMSComponents/CMSText/MultiLangText/MultiLangText";
import { TextEditor } from "../../../../../../Components/CMSComponents/CMSText/TextEditor/TextEditor";
import { QuestionBlock } from "../../../../../../Components/CMSComponents/CMSQuestionBlock/QuestionBlock";
import { type IContent } from "../../../../Model/FooterInterfaceAndTypes";
import { CMSHeader } from "../../../../Components/CMSComponents/CMSHeader/CMSHeader";

const Content = memo<IContent>(({ pageTextContent }) => (
  <div className={classes.content}>
    {
      isArray(pageTextContent)
        ? pageTextContent.map((el, index) => (
          <QuestionBlock
            key={index}
            question={el}
            classNameActive={classes.activeQuestion}
            classNameQuestion={classes.question}
            classNameAnswerToQuestion={classes.answerToQuestion}
            classNameWrapper={classes.questionWrapper}
            Icon={CollapseIcon}
          />
        ))
        : null
    }
  </div>
));
Content.displayName = "Content";

const CMSSimplePage = memo<ICMSPage>(({ page }) => {
  const { id } = page;

  const content = useParamSelector(CMSPageContentByPageIdSelector, [id]);

  const ref = useRef<HTMLDivElement>(null);

  if (isNil(content) || !isSimplePageBlockContent(content) || isNil(content.simplePageContent)) {
    return null;
  }
  const pageContent = content.simplePageContent;
  const {
    title,
    backgroundImage,
    logoImage,
    gameImage,
    simplePageContentList,
    textEditor,
  } = pageContent;

  const conditionForRenderWrapper =
    isNotVoid(backgroundImage?.image) ||
    isNotVoid(logoImage?.image) ||
    isNotVoid(title?.description);

  return (
    <div className={classes.cmsFooterPageWrapper}>
      <CMSHeader />

      <div className={classes.footerPageContent}>
        {
          conditionForRenderWrapper
            ? (
              <div className={classes.wrapper}>
                <CMSImage className={classes.backgroundWrapper} img={backgroundImage?.image} />

                <div className={classes.titleContent}>
                  <div className={classes.gameTextWrapper}>
                    <CMSImage className={classes.logoWrapper} img={logoImage?.image} />

                    <MultiLangText className={classes.titleWrapper} arr={title?.description} />
                  </div>

                  <CMSImage className={classes.gameWrapper} img={gameImage?.image} />
                </div>
              </div>

            )
            : null
        }

        <div ref={ref} className={classes.contentWrapper}>
          <TextEditor className={classes.content} textEditor={textEditor} />

          <Content pageTextContent={simplePageContentList?.content} />
        </div>
      </div>
    </div>
  );
});
CMSSimplePage.displayName = "CMSSimplePage";

export { CMSSimplePage };
