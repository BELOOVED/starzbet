import { useSelector } from "react-redux";
import { viewportWidthSelector } from "../Store/Viewport/ViewportSelectors";

const useGetImgHeight = (ratio: number, sumMargins = 0, countOnRow = 1, leftContainerWidth = 0, rightContainerWidth = 0) => {
  const viewportWidth = useSelector(viewportWidthSelector);
  const containerWidth = viewportWidth - leftContainerWidth - rightContainerWidth - sumMargins;

  const oneElementWidth = Math.floor(containerWidth / countOnRow);

  return Math.floor(oneElementWidth / ratio);
};

export { useGetImgHeight };
