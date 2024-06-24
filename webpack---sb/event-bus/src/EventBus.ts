type TSubscriber<EVENTS extends Record<string, unknown[]>> = (...args: EVENTS[keyof EVENTS]) => void;

class EventBus<EVENTS extends Record<string, unknown[]>> {
  protected eventStore = new Map<keyof EVENTS, TSubscriber<EVENTS>[]>();

  publish<EVENT extends keyof EVENTS>(event: EVENT, ...args: EVENTS[EVENT]): void {
    const subscribers = this.eventStore.get(event);

    if (!subscribers) {
      return;
    }

    for (const subscriber of subscribers) {
      subscriber(...args);
    }
  }

  subscribe<EVENT extends keyof EVENTS>(event: EVENT, subscriber: (...args: EVENTS[EVENT]) => void) {
    const subscribers = this.eventStore.get(event) ?? [];

    this.eventStore.set(event, subscribers.concat(subscriber as TSubscriber<EVENTS>));

    return () => {
      const subscribers = this.eventStore.get(event) ?? [];

      this.eventStore.set(
        event,
        subscribers.filter(
          (it) => it !== subscriber,
        ),
      );
    };
  }

  unsubscribe<EVENT_NAME extends keyof EVENTS>(event: EVENT_NAME) {
    this.eventStore.delete(event);
  }

  unsubscribeFromAll() {
    this.eventStore.clear();
  }
}

class EventBusWithState<EVENTS extends Record<string, unknown[]>> {
  #eventBus = new EventBus<EVENTS>();
  protected lastPublishedData = new Map<keyof EVENTS, EVENTS[keyof EVENTS]>();

  publish<EVENT extends keyof EVENTS>(event: EVENT, ...args: EVENTS[EVENT]): void {
    this.#eventBus.publish(event, ...args);
    this.lastPublishedData.set(event, args);
  }

  subscribe = this.#eventBus.subscribe.bind(this.#eventBus);
  unsubscribeFromAll = this.#eventBus.unsubscribeFromAll.bind(this.#eventBus);

  getLastPublishData<EVENT extends keyof EVENTS>(event: EVENT): EVENTS[EVENT] | undefined {
    return this.lastPublishedData.get(event) as EVENTS[EVENT] | undefined;
  }
}

export { EventBus, EventBusWithState };
