

export function checkTruthyValues(...values) {
    for (let value of values) {
      if (!value) {
        return {
          result: false,
          failedValue: value,
        };
      }
    }
    return { result: true };
  }