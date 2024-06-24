import { from, switchMap } from "rxjs";
import { cheaterEpicFactory, extractExport } from "@sb/utils";
import type { TCmsAppEpic } from "../../../Model/TCmsAppEpic";

const exportCmsCheatCodeEpic = cheaterEpicFactory<TCmsAppEpic>(
  ["cmsexport"],
  (action$, state$, dependencies) =>
    from(
      import("./ExportEpic")
        .then(extractExport("exportCmsEpic")),
    )
      .pipe(
        switchMap((epic) => epic(action$, state$, dependencies)),
      ),
  "Export CMS",
);

const importCmsCheatCodeEpic = cheaterEpicFactory<TCmsAppEpic>(
  ["cmsimport"],
  (action$, state$, dependencies) =>
    from(
      import("./ImportEpic")
        .then(extractExport("pushImportedCmsEpic")),
    )
      .pipe(
        switchMap((epic) => epic(action$, state$, dependencies)),
      ),
  "Import CMS",
);

export {
  importCmsCheatCodeEpic,
  exportCmsCheatCodeEpic,
};
