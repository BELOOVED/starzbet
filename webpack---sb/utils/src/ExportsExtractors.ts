import { isArray } from "./IsTypeOf";

type TExportExtractor = <M, K extends keyof M>(exportName: K) => (module: M) => M[K];

// Don't remove this types, without these, extractDefaultExport show incorrect types
type TWithStringExports<M, K extends keyof M> = (module: M) => ({default: M[K]})
type TWithArrayExports<M, K extends (keyof M)[]> = (module: M) => ({default: M[K[number]]}[])

function extractDefaultExport<M, K extends keyof M>(exportName: K): TWithStringExports<M, K>
function extractDefaultExport<M, K extends (keyof M)[]>(exportName: K): TWithArrayExports<M, K>
function extractDefaultExport<M, K extends keyof M>(exportName: K | K[]) {
  return (module: M) => {
    if (isArray(exportName)) {
      return exportName.map((name) => ({default: module[name]}))
    }

    return ({ default: module[exportName] })
  };
}

const extractExport: TExportExtractor =
  (exportName) => (module) => module[exportName];

export { extractDefaultExport, extractExport };
