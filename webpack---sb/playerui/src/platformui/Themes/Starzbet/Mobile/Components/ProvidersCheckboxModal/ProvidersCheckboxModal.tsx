import { type ChangeEvent, type ComponentType, createElement, type FC, memo, type PropsWithChildren, useCallback, useState } from "react";
import { useRouteMatch } from "@sb/react-router-compat";
import { isEmpty, isNotVoid, type TSelector, type TVoidFn, useParamSelector, withParamCondition, withProps } from "@sb/utils";
import {
  platformui_starzbet_casino_title_apply,
  platformui_starzbet_casino_title_choose_your_popular_providers,
  platformui_starzbet_casino_title_providers,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { sportsbookui_starzbet_searchInput_title_search } from "@sb/translates/sportsbookui/Themes/Starzbet/TKeys";
import classes from "./ProvidersCheckboxModal.module.css";
import { BaseModalCreator } from "../../../../../../common/Components/BaseModalCreator/BaseModalCreator";
import { SearchIcon } from "../../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Icons/SearchIcon/SearchIcon";
import { When } from "../../../../../../common/Components/When";
import { Link } from "../../../../../../common/Themes/Starzbet/Components/Link/Link";
import { type TIconProps } from "../../../../../../common/Components/Icon/Icon";
import { CloseDefaultIcon } from "../../../../../../common/Themes/Starzbet/Components/Icons/CloseIcon/CloseIcon";
import { type TGameProviderEnum } from "../../../../../../common/Store/Provider/ProviderModel";
import { type IWithGamePage, systemLabels, type TGameManagerPage } from "../../../../../Store/Games/Model/Games";
import { combineProvidersSelector, providersByPageExistSelector } from "../../../../../Store/Games/Selectors/GamesSelectors";
import { combineProvidersPathByGamePageMap, labelPathByGamePageMap } from "../../../../../Utils/GetGamesViewParams";
import { prioritizedProvidersByPageSelector } from "../../../../../Store/Games/Selectors/PrioritizedProvidersSelectors";
import { type TWithGamesState } from "../../../../../Store/Games/GamesInitialState";
import { scrollToTop } from "../../../../../Utils/ScrollToTop";
import { stringifyProviders } from "../../../../../Store/Games/GamesUtils";
import { Ellipsis } from "../../../../../Components/Ellipsis/Ellipsis";
import { ThemedModalHeader } from "../../../Components/ThemedModal/ThemedModalHeader/ThemedModalHeader";
import { ThemedModal } from "../../../Components/ThemedModal/ThemedModal";
import { ProviderIcon } from "../../../Components/Icons/ProviderIcon/ProviderIcon";
import { DownChevronIcon } from "../../../Components/Icons/DownChevronIcon/DownChevronIcon";
import { Button } from "../Button/Button";
import { ProvidersCheckbox } from "../ProvidersCheckbox/ProvidersCheckbox";

interface IDropdownMenuProps extends IWithGamePage {
  closeHandler: TVoidFn;
}

interface ISearchInputProps {
  setText: (text: string) => void;
  text: string;
}

const SearchInput = memo<ISearchInputProps>(({ setText, text }) => {
  const [t] = useTranslation();
  const reset = () => setText("");
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  return (
    <div className={classes.searchInput}>
      <div className={classes.searchIcon}>
        <SearchIcon size={"xs"} />
      </div>

      <input
        type={"text"}
        placeholder={t.plain(sportsbookui_starzbet_searchInput_title_search)}
        onChange={onChange}
        value={text}
        className={classes.input}
      />

      <When condition={isNotVoid(text)}>
        <CloseDefaultIcon className={classes.searchIcon} onClick={reset} />
      </When>
    </div>
  );
});
SearchInput.displayName = "SearchInput";

const ModalContent = memo<IDropdownMenuProps>(({
  page,
  closeHandler,
}) => {
  const [t] = useTranslation();

  const isCombineProvidersPath = useRouteMatch(combineProvidersPathByGamePageMap[page]);

  const [text, setText] = useState("");

  const providersWithCount = useParamSelector(prioritizedProvidersByPageSelector, [page, text]);
  const providers = useParamSelector(combineProvidersSelector, [page]);
  const [activeProviders, setActiveProviders] = useState<TGameProviderEnum[]>(providers || []);

  const toggleProvider = useCallback(
    (provider: TGameProviderEnum) => {
      if (activeProviders.includes(provider)) {
        setActiveProviders(activeProviders.filter((it) => it !== provider));
      } else {
        setActiveProviders([...activeProviders, provider]);
      }
    },
    [activeProviders],
  );

  const onAccept = () => {
    closeHandler();
    scrollToTop();
  };

  const disabledButton = Boolean(isCombineProvidersPath && providers === activeProviders);

  const labelPath = labelPathByGamePageMap[page];

  const allLabelPath = { to: labelPath, params: { labelId: systemLabels.all } };

  const path = isEmpty(activeProviders)
    ? allLabelPath
    : { to: combineProvidersPathByGamePageMap[page], params: { providers: stringifyProviders(activeProviders) } };

  return (
    <div className={classes.providersContainer}>
      <SearchInput text={text} setText={setText} />

      <ProvidersCheckbox
        providersWithCount={providersWithCount}
        onClick={toggleProvider}
        activeProviders={activeProviders}
      />

      <div className={classes.providersBottom}>
        <Link {...path}>
          <Button onClick={onAccept} className={classes.acceptButton} disabled={disabledButton}>
            {t(platformui_starzbet_casino_title_apply)}
          </Button>
        </Link>
      </div>
    </div>
  );
});
ModalContent.displayName = "ModalContent";

const ModalTitle = memo(() => {
  const [t] = useTranslation();

  return (
    <div className={classes.providersHeader}>
      <ProviderIcon color={"blue"} />

      <div className={classes.providerHeaderTitle}>
        <span>{t(platformui_starzbet_casino_title_providers)}</span>

        <span>{t(platformui_starzbet_casino_title_choose_your_popular_providers)}</span>
      </div>
    </div>
  );
});
ModalTitle.displayName = "ModalTitle";

interface IModalProps extends IWithGamePage {
  hideModal: TVoidFn;
}

const Modal = memo<IModalProps>(({ hideModal, page }) => (
  <ThemedModal onCancel={hideModal} className={classes.providersModal}>
    <ThemedModalHeader closeButtonClickHandler={hideModal} className={classes.providersModalHeader}>
      <ModalTitle />
    </ThemedModalHeader>

    <ModalContent page={page} closeHandler={hideModal} />
  </ThemedModal>
));
Modal.displayName = "Modal";

interface IFilterButtonProps {
  onClick: TVoidFn;
  icon: ComponentType<TIconProps>;
  isOpen?: boolean;
}

const FilterButton: FC<PropsWithChildren<IFilterButtonProps>> = ({
  onClick,
  icon,
  children,
  isOpen,
}) => (
  <Button onClick={onClick} className={classes.filterButton}>
    <div className={classes.unionIcon}>
      {createElement(icon, { size: "s" })}
    </div>

    <div className={classes.filterButtonContent}>
      {children}
    </div>

    <div className={classes.chevronIcon}>
      <DownChevronIcon
        width={10}
        height={6}
        color={"darkText"}
        className={isOpen ? classes.activeIcon : undefined}
      />
    </div>
  </Button>
);
FilterButton.displayName = "FilterButton";

const params = { labelId: systemLabels.all };

const ModalController = memo<IWithGamePage>(({ page }) => {
  const [t] = useTranslation();
  const isCombineProvidersPath = useRouteMatch(combineProvidersPathByGamePageMap[page]);
  const providers = useParamSelector(combineProvidersSelector, [page]);

  const showCount = isCombineProvidersPath && !!providers;

  const labelPath = labelPathByGamePageMap[page];

  const modal = (hideModal: TVoidFn) => <Modal hideModal={hideModal} page={page} />;

  return (
    <BaseModalCreator modal={modal}>
      {
        (toggleModal) => (
          <div className={classes.providersButtonContainer}>
            <FilterButton onClick={toggleModal} icon={withProps(ProviderIcon)({ color: "blue" })}>
              <Ellipsis>{t(platformui_starzbet_casino_title_providers)}</Ellipsis>

              {showCount ? <span className={classes.count}>{`: ${providers.length}`}</span> : null}
            </FilterButton>

            {
              isCombineProvidersPath
                ? (
                  <Link className={classes.closeIcon} to={labelPath} params={params}>
                    <CloseDefaultIcon className={classes.closeIconColor} size={"xss"} />
                  </Link>
                )
                : null
            }
          </div>
        )
      }
    </BaseModalCreator>
  );
});
ModalController.displayName = "ModalController";

interface IProviderCheckboxSimpleControllerProps extends IWithGamePage {
  buttonClassName?: string;
}

const ProviderCheckboxSimpleController: FC<PropsWithChildren<IProviderCheckboxSimpleControllerProps>> = ({
  page,
  children,
  buttonClassName,
}) => {
  const modal = (hideModal: TVoidFn) => <Modal hideModal={hideModal} page={page} />;

  return (
    <BaseModalCreator modal={modal}>
      {
        (toggleModal) => (
          <Button onClick={toggleModal} className={buttonClassName}>
            {children}
          </Button>
        )
      }
    </BaseModalCreator>
  );
};
ProviderCheckboxSimpleController.displayName = "ProviderCheckboxSimpleController";

const ProvidersCheckboxModal = withParamCondition(
  // todo improve withParamCondition types
  providersByPageExistSelector as TSelector<TWithGamesState, boolean, [page: TGameManagerPage]>,
  ["page"],
  ModalController,
);
ProvidersCheckboxModal.displayName = "ProvidersCheckboxModal";

export { ProvidersCheckboxModal, ProviderCheckboxSimpleController };
