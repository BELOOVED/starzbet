const preventDefault = <T extends Pick<Event, "preventDefault">>(event: T) => event.preventDefault();

const stopPropagation = <T extends Pick<Event, "stopPropagation">>(event: T) => event.stopPropagation();

export { preventDefault, stopPropagation };
