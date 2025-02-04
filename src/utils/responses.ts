"use server";

const backend = process.env.BACKEND_URL;

export async function getAiResponse(query: string): Promise<string> {
  try {
    const response = await fetch(`${backend}/response/${query}`);
    const text = await response.text();
    return text;
  } catch (error) {
    console.error(error);
    return "Some error occured. Please try again later.";
  }
}
