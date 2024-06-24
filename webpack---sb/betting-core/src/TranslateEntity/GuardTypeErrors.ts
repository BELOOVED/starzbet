class UnknownParticipantShortId extends Error {
  constructor(value: unknown) {
    super(`Unknown participant short id: ${value}`);
  }
}

class UnknownScopeType extends Error {
  constructor(value: unknown) {
    super(`Unknown scope type: ${value}`);
  }
}

class UnknownOutcomePredicate extends Error {
  constructor(value: unknown) {
    super(`Unknown outcome predicate: ${value}`);
  }
}

class UnknownValue extends Error {
  constructor(value: unknown) {
    super(`Unknown value: ${value}`);
  }
}

class UnknownOutcomeEnumValue extends Error {
  constructor(value: unknown) {
    super(`Unknown outcome enum value: ${value}`);
  }
}

class UnknownMarketColor extends Error {
  constructor(value: unknown) {
    super(`Unknown market color: ${value}`);
  }
}

class UnknownScoreDiff extends Error {
  constructor(value: unknown) {
    super(`Unknown score diff: ${value}`);
  }
}

export {
  UnknownParticipantShortId,
  UnknownScopeType,
  UnknownOutcomePredicate,
  UnknownValue,
  UnknownOutcomeEnumValue,
  UnknownMarketColor,
  UnknownScoreDiff,
};
