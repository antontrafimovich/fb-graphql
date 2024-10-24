// const pause = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const revalidate = 15;

const pause = (ms: number) => new Promise((res) => setTimeout(res, ms));

const iteratorToReadableStream = (iterator: AsyncGenerator) => {
  return new ReadableStream({
    async pull(controller) {
      const { value, done } = await iterator.next();

      if (done) {
        controller.close();
      } else {
        controller.enqueue(value);
      }
    },
  });
};

const encoder = new TextEncoder();

async function* makeIterator() {
  const data = encoder.encode("<p>Hello</p>");
  console.log(data);
  yield data;
  await pause(2000);

  yield encoder.encode("<p>World</p>");
  await pause(2000);

  yield encoder.encode("<p>My name is</p>");
  await pause(2000);

  yield encoder.encode("<p>John Doe</p>");
}

export const dynamic = "force-dynamic";

export async function GET() {
  // const iterator = makeIterator();
  // const stream = iteratorToReadableStream(iterator);

  // return new Response(stream);
  const response = await fetch("http://localhost:7000/test", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  console.log(result);

  return Response.json({ data: result.message });
}
