import { MonoClock } from "@sb/utils/TimeUtils/MonoClock";
import { clientUrl } from "../Urls";

const monoClock = new MonoClock(`${clientUrl}/time`);

export { monoClock };
