import { createInitialState } from "../Store/CreateInitialState";
import { createControlFactory } from "../Store/CreateControlFactory";

const controlFactory = createControlFactory(createInitialState);

export { controlFactory };
