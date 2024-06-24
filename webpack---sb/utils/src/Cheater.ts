type TCallback = () => void;

type TListener = (e: KeyboardEvent) => void;

type TCleaner = () => void;

type TPerformer = {
  words: string[];
  description: string;
  callback: TCallback;
  listener: TListener;
  cleaner: TCleaner;
};

class Cheater {
  private static cheatsWord = "cheats";
  private static initialized = false;
  private static performers: TPerformer[] = [];

  /**
   * Adds a callback that will be executed after activating the cheat
   *
   * @param words List of words that activate the cheat (only lowercase letters and numbers are allowed)
   * @param callback The function that will be executed after the activation of the cheat
   * @param description Describes what will happen after activation of cheat
   */
  public static add(words: string[], callback: TCallback, description: string) {
    if (!Cheater.initialized) {
      Cheater.initialize();
    }

    Cheater.validateWords(words);

    const upperCaseWords = words.map((word) => word.toUpperCase());

    let cheatWord = "";

    const listener: TListener = (e) => {
      const typing = e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement;

      if (typing) {
        cheatWord = "";

        return;
      }

      /**
       * Can be undefined if we have inputs with autocomplete in on the page.
       * When input is autocompleted, and we emit mouse click - keydown event was emitted.
       */
      const char = e.code?.split(/(Key|Digit)/)[2];

      if (!char) {
        cheatWord = "";

        return;
      }

      if (upperCaseWords.some((word) => word.startsWith(cheatWord))) {
        cheatWord += char;
      } else {
        cheatWord = char;
      }

      const match = upperCaseWords.find((word) => word === cheatWord);

      if (match) {
        if (match.toLowerCase() !== Cheater.cheatsWord) {
          console.info(`\x1b[46m\x1b[30m Cheat \x1b[1m${cheatWord}\x1b[0m\x1b[46m\x1b[30m activated `);
        }

        cheatWord = "";

        callback();
      }
    };

    const cleaner: TCleaner = () => {
      cheatWord = "";
    };

    Cheater.performers.push({
      words: upperCaseWords,
      description,
      callback,
      listener,
      cleaner,
    });
  }

  /**
   * Removes the cheat callback equal to the one added by reference
   *
   * @param callback Function that was passed to "add" method
   */
  public static remove(callback: TCallback) {
    const index = Cheater.performers.findIndex((performer) => performer.callback === callback);

    if (index === -1) {
      throw new Error("Cheater Listener to remove not found");
    }

    Cheater.performers.splice(index, 1);

    Cheater.performers.forEach((performer) => {
      performer.cleaner();
    });
  }

  /**
   * Creates a function that will return true after activating the cheat
   *
   * @param words List of words that activate the cheat (only lowercase letters and numbers are allowed)
   * @param description Describes what will happen after activation of cheat
   */
  public static create(words: string[], description: string) {
    let used = false;

    const callback: TCallback = () => {
      used = true;
    };

    Cheater.add(words, callback, description);

    return {
      isUsed: () => used,
      reset: () => {
        used = false;
      },
    };
  }

  private static initialize() {
    if (typeof window === "undefined") {
      return;
    }

    window.addEventListener("keydown", (e) => {
      if (e.repeat) {
        return;
      }

      Cheater.performers.forEach((performer) => {
        performer.listener(e);
      });
    });

    Cheater.initialized = true;

    Cheater.add(
      [Cheater.cheatsWord],
      () => {
        console.info(`\x1b[46m\x1b[30m Cheats `);

        Cheater.performers.forEach((it) => {
          console.info(`  \x1b[46m\x1b[30m ${it.description} - \x1b[1m${it.words.join(" ")} `);
        });
      },
      "Logs list of added cheats",
    )
  }

  private static validateWords(words: string[]) {
    words.forEach((word) => {
      if (!/^[a-z\d]*$/.test(word)) {
        throw new Error(`Cheat word can only consist of lowercase letters and numbers: ${word}`);
      }
    })
  }
}

export { Cheater };
