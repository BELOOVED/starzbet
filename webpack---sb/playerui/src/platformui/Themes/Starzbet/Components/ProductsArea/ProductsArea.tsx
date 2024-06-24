import clsx from "clsx";
import { memo } from "react";
import { useSelector } from "react-redux";
import {
  platformui_starzbet_landing_productsArea_casino,
  platformui_starzbet_landing_productsArea_games,
  platformui_starzbet_landing_productsArea_liveCasino,
  platformui_starzbet_landing_productsArea_liveTV,
  platformui_starzbet_landing_productsArea_mobileApp,
  platformui_starzbet_landing_productsArea_promos,
  platformui_starzbet_landing_productsArea_sports,
  platformui_starzbet_landing_productsArea_virtual,
  platformui_starzbet_vipClub_page_title,
} from "@sb/translates/platformui/Themes/Starzbet/TKeys";
import { useTranslation } from "@sb/translator";
import { getNotNil, isNotNil, useParamSelector } from "@sb/utils";
import { EPageType } from "@sb/cms-core";
import classes from "./ProductsArea.module.css";
import {
  getLocalizedRouteProps,
  type TLocalizedRouteProps,
} from "../../../../../common/Client/Core/Services/RouterService/Utils/GetLocalizedRouteProps";
import type { TLocalizedRouteParams } from "../../../../../common/Client/Core/Services/RouterService/Model/RoutesTypes";
import { IS_STARZBET_KG } from "../../../../../ServerEnvironment";
import { routeMap } from "../../../../RouteMap/RouteMap";
import { Ellipsis } from "../../../../Components/Ellipsis/Ellipsis";
import { CMSUrlByPageTypeSelector } from "../../../../Store/CMS/Selectors/CMSPageContentSelectors";
import { NavLinkToTop } from "../../../../Components/NavLink/NavLinkToTop";
import { getCorrectLinkByUrl } from "../../../../Store/CMS/Utils/GetCorrectLinkByUrl";
import { CMSTVChannelSelector } from "../../Store/CMS/Selectors/CMSSelectors";

type TExternalProduct = {
  link: string;
  external: true;
  text: string;
  className: string;
}

type TInternalProduct = {
  link: TLocalizedRouteProps<string>;
  external?: never;
  text: string;
  className: string;
}

type TProduct = TInternalProduct | TExternalProduct

const isExternalLink = (candidate: TProduct): candidate is TExternalProduct => "external" in candidate && Boolean(candidate.external);

const MOBILE_APP_LINK = IS_STARZBET_KG ? "https://starzbet.kg" : "https://starzbet.app";
const LIVE_TV_LINK = IS_STARZBET_KG ? "https://starzbet.kg" : "https://truelink.ch/starzbettv";

const products = (promoLink: TLocalizedRouteParams<string>, tvLink: string, withoutSport = false): TProduct[] => [
  {
    text: platformui_starzbet_landing_productsArea_casino,
    className: getNotNil(classes.casino, ["ProductsArea"], "classes.casino"),
    link: routeMap.casino,
  },
  {
    text: platformui_starzbet_landing_productsArea_liveCasino,
    className: getNotNil(classes.liveCasino, ["ProductsArea"], "classes.liveCasino"),
    link: routeMap.liveCasino,
  },
  !withoutSport
    ? {
      text: platformui_starzbet_landing_productsArea_sports,
      className: getNotNil(classes.sports, ["ProductsArea"], "classes.sports"),
      link: routeMap.preLive,
    }
    : null,
  {
    text: platformui_starzbet_landing_productsArea_virtual,
    className: getNotNil(classes.virtual, ["ProductsArea"], "classes.virtual"),
    link: routeMap.virtual,
  },
  {
    text: platformui_starzbet_landing_productsArea_games,
    className: getNotNil(classes.games, ["ProductsArea"], "classes.games"),
    link: routeMap.games,
  },
  {
    text: platformui_starzbet_landing_productsArea_promos,
    className: getNotNil(classes.promos, ["ProductsArea"], "classes.promos "),
    link: promoLink,
  },
  {
    text: platformui_starzbet_landing_productsArea_mobileApp,
    className: getNotNil(classes.mobileApp, ["ProductsArea"], "classes.mobileApp"),
    link: MOBILE_APP_LINK,
    external: true,
  },
  {
    text: platformui_starzbet_landing_productsArea_liveTV,
    className: getNotNil(classes.liveTV, ["ProductsArea"], "classes.liveTV "),
    link: tvLink,
    external: true,
  },
  {
    text: platformui_starzbet_vipClub_page_title,
    className: getNotNil(classes.vipClub, ["ProductsArea"], "classes.vipClub "),
    link: routeMap.vipClubRoute,
  },
].filter(isNotNil) as TProduct[]; // after filter TLocalizedRouteProps<string> -> string

const ProductsArea = memo<IWithClassName>(({ className }) => {
  const [t] = useTranslation();

  const promoUrl = useParamSelector(CMSUrlByPageTypeSelector, [EPageType.promoPage]);

  const link = getCorrectLinkByUrl(routeMap.cms, promoUrl);

  const tvLink = useSelector(CMSTVChannelSelector) ?? LIVE_TV_LINK;

  const productsAreaClassName = clsx(classes.productsArea, className, IS_STARZBET_KG && classes.kgProductsArea);

  return (

    <div className={clsx(productsAreaClassName)}>
      {
        products(link, tvLink, IS_STARZBET_KG).map((props) => {
          if (isExternalLink(props)) {
            const {
              link,
              text,
              className,
            } = props;

            return (
              <a
                key={link}
                href={link}
                target={"_blank"}
                className={clsx(classes.product, className)}
                rel={"noreferrer"}
              >
                <Ellipsis className={classes.productText}>{t(text)}</Ellipsis>

                <div className={classes.gradient} />
              </a>
            );
          }

          const {
            link,
            text,
            className,
          } = props;

          const path = getLocalizedRouteProps(link);

          return (
            <NavLinkToTop
              {...path}
              toTop
              key={path.to}
              className={clsx(classes.product, className)}
            >
              <Ellipsis className={classes.productText}>{t(text)}</Ellipsis>

              <div className={classes.gradient} />
            </NavLinkToTop>
          );
        })
      }
    </div>
  );
});
ProductsArea.displayName = "ProductsArea";

export { ProductsArea };
