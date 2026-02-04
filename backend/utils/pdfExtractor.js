export async function extractTextFromPDF(buffer) {
  try {
    const { default: pdfParse } = await import("pdf-parse/lib/pdf-parse.js");

    const data = await pdfParse(buffer);
    return data.text || "";
  } catch (error) {
    console.error("PDF PARSE ERROR:", error.message);
    throw error;
  }
}
