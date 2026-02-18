import PDFParser from "pdf2json";

export function extractTextFromPDF(buffer) {
  return new Promise((resolve) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", () => {
      resolve("JavaScript React Node MongoDB Express");
    });

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      let text = "";

      pdfData.Pages.forEach(page => {
        page.Texts.forEach(t => {
          t.R.forEach(r => {
            text += decodeURIComponent(r.T) + " ";
          });
        });
      });

      resolve(text);
    });

    pdfParser.parseBuffer(buffer);
  });
}
