import { createElement } from "react";

const fromRenderProps = (component) => (props) => createElement(component, props);

export { fromRenderProps };
