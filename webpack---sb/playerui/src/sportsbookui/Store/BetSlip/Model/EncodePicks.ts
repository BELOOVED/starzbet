import { encodeBase64 } from "@sb/utils";

const encodePicks = (picks) => encodeURIComponent(encodeBase64(JSON.stringify(picks)));

export { encodePicks };
