import { type IVersionedDiff } from "@sb/sdk/diff/protocol/VersionedDiff";
import { DiffProtocol } from "./DiffProtocol";

const getDiffVersion = (diff: IVersionedDiff) => diff.versions[0];

abstract class DiffProtocolWithBaseExtractor<S = unknown> extends DiffProtocol<IVersionedDiff, IVersionedDiff, S> {
  protected override versionSnapshotExtractor = getDiffVersion;
  protected override versionDiffExtractor = getDiffVersion;
}

export { DiffProtocolWithBaseExtractor };
