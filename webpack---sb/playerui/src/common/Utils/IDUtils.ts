const findById = <Node extends IWithId>(list: Node[], id: string) => list.find((it) => it.id === id);
const extractId = <Node extends IWithId>({ id }: Node) => id;
const extractIds = <Node extends IWithId>(list: Node[]) => list.map(extractId);

export { extractIds, extractId, findById };
