import { createOrm, setConcreteOrm, withMemoization, withRefCounter, withSmartInsert } from "@sb/rorm";

const rootOrm = withSmartInsert(
  withMemoization(
    withRefCounter(
      createOrm({
        refs: [],
        records: [],
      }),
    ),
  ),
);

setConcreteOrm(rootOrm);

export { rootOrm };
