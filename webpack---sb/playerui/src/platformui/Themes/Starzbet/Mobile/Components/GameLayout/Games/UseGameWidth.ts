import { useSelector } from "react-redux";
import { viewportWidthSelector } from "../../../../../../Store/Viewport/ViewportSelectors";

const useGameWidth = () => {
  const width = useSelector(viewportWidthSelector);

  return (0.5 * (width - 12));
};
export { useGameWidth };
