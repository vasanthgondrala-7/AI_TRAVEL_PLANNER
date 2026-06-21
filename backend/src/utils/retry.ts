export async function retry<T>(
  fn: () => Promise<T>,
  retries = 5
): Promise<T> {

  let delay = 1000;

  for (
    let i = 0;
    i < retries;
    i++
  ) {

    try {

      return await fn();

    } catch (error) {

      if (
        i === retries - 1
      ) {
        throw error;
      }

      await new Promise(
        (resolve) =>
          setTimeout(
            resolve,
            delay
          )
      );

      delay *= 2;
    }
  }

  throw new Error(
    "Retry failed"
  );
}