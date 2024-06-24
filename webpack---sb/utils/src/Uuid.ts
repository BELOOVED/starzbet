import * as uuid from "uuid";

const uuid4 = uuid.v4 as () => string;
const uuid1 = uuid.v1 as () => string;

export { uuid4, uuid1 };

