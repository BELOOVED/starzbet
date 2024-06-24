// @ts-nocheck
import Slider from "react-slick";
import clsx from "clsx";
import { Children, createElement, createRef, memo, useState } from "react";
import { type TExplicitAny } from "@sb/utils";
import classes from "./Banner.module.css";
import { range } from "../../../../../sportsbookui/Utils/Range";
import { Arrow } from "../../../../../sportsbookui/Themes/Starzbet/OriginalApplication/Components/Arrow/Arrow";

const settings = {
  className: classes.carousel,
  infinite: true,
  dots: false,
  arrows: false,
  slidesToShow: 1,
  centerPadding: "0px",
  speed: 500,
  autoplay: true,
  autoplaySpeed: 5000,
};

const positionToClassNameMap = {
  "right": classes.right,
  "top": classes.top,
};

const SimpleBanner = memo(({
  image,
  title1,
  title2,
  title3,
  description,
  link,
  slot,
}) => (
  <div className={clsx(classes.banner, positionToClassNameMap[slot])}>
    {createElement(image, { className: classes.image })}

    {createElement(link, { className: classes.link })}

    <div className={classes.info}>
      <div className={classes.title1}>
        {createElement(title1)}
      </div>

      <div className={classes.title2}>
        {createElement(title2)}
      </div>

      <div className={classes.title3}>
        {createElement(title3)}
      </div>

      <div className={classes.description}>
        {createElement(description)}
      </div>
    </div>
  </div>
));
SimpleBanner.displayName = "SimpleBanner";

const Container = ({ children, isMobile }) => (
  <div className={clsx(classes.landing, isMobile ? classes.mobile : classes.desktop)}>
    {children}
  </div>
);
Container.displayName = "Container";

const CarouselContainer = ({ children, slideCount }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const ref = createRef();

  const next = () => ref.current.slickNext();

  const prev = () => ref.current.slickPrev();

  const goTo = (e) => ref.current.slickGoTo(Number(e.currentTarget.dataset.slide));

  return (
    <div className={classes.carouselContainer}>
      <Slider {...settings} afterChange={setCurrentSlide} ref={ref}>
        {children}
      </Slider>

      <div className={classes.controls}>
        <div className={`${classes.arrow} ${classes.arrowPrev}`} onClick={prev}>
          <Arrow size={16} />
        </div>

        {
          range(0, slideCount - 1).map((i) => (
            <div
              className={clsx(classes.dot, i === currentSlide && classes.active)}
              key={i}
              data-slide={i}
              onClick={goTo}
            />
          ))
        }

        <div className={`${classes.arrow} ${classes.arrowNext}`} onClick={next}>
          <Arrow size={16} />
        </div>
      </div>
    </div>
  );
};
CarouselContainer.displayName = "CarouselContainer";

const MaybeCarousel = ({ children, isMobile }) => {
  const count = Children.count(children);

  return (
    <Container isMobile={isMobile}>
      {
        count > 1
          ? (
            <CarouselContainer slideCount={count}>
              {children}
            </CarouselContainer>
          )
          : children
      }
    </Container>
  );
};
MaybeCarousel.displayName = "MaybeCarousel";

interface IBanner {
  banners: TExplicitAny;
  slot?: string;
  isMobile?: boolean;
}

const Banner = memo<IBanner>(({ banners, slot, isMobile = false }) => (
  <MaybeCarousel isMobile={isMobile}>
    {
      banners.map((props, i) => (
        <SimpleBanner
          {...props}
          key={i}
          slot={slot}
        />
      ))
    }
  </MaybeCarousel>
));
Banner.displayName = "Banner";

export { Banner };
