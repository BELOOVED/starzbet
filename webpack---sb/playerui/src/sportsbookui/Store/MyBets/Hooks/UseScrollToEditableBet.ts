import { useSelector } from "react-redux";
import { editingByBetIdSelector } from "../Selectors/MyBetsSelectors";

const useScrollToEditableBet = <E extends HTMLElement>(betId: string) => {
  const editing = useSelector(editingByBetIdSelector(betId));

  if (!editing) {
    return null;
  }

  return (node: E) => {
    if (!node) {
      return;
    }
    node.scrollIntoView();
  };
};

export { useScrollToEditableBet };
