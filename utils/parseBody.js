const parseBody = async (req) => {
  let body = {};

  await req.on("data", (chunk) => {
    const bodyString = chunk.toString();
    const parsedBody = JSON.parse(bodyString);

    body = { ...parsedBody };
  });

  return body;
};

module.exports = parseBody;
