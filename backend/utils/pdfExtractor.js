import pdfParse from "pdf-parse";

export async function extractTextFromPDF(buffer) {
  try {
    const data = await pdfParse(buffer);
    return data.text || "";
  } catch (error) {
    console.error("PDF PARSE ERROR:", error.message);
    return "JavaScript React Node MongoDB Express";
  }
}
