export const parseGeminiJson =
(
  text: string
) => {

  const cleaned =
    text
      .replace(
        /```json/g,
        ""
      )
      .replace(
        /```/g,
        ""
      )
      .trim();

  return JSON.parse(
    cleaned
  );
};