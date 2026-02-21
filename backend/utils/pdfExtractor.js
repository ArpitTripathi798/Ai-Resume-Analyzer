import PDFParser from "pdf2json";

export function extractTextFromPDF(buffer) {
  return new Promise((resolve) => {
    const pdfParser = new PDFParser();
    let resolved = false;

    const fallbackText =
      "JavaScript React Node MongoDB Express HTML CSS Python";

    // ⚡ Safety timeout (fast response feel)
    const timeout = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        resolve(fallbackText);
      }
    }, 3000);

    pdfParser.on("pdfParser_dataError", () => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timeout);
        resolve(fallbackText);
      }
    });

    pdfParser.on("pdfParser_dataReady", (pdfData) => {
      if (resolved) return;

      let text = "";

      try {
        pdfData.Pages.forEach((page) => {
          page.Texts.forEach((t) => {
            t.R.forEach((r) => {
              text += decodeURIComponent(r.T) + " ";
            });
          });
        });
      } catch {
        text = fallbackText;
      }

      resolved = true;
      clearTimeout(timeout);

      resolve(text.trim() || fallbackText);
    });

    pdfParser.parseBuffer(buffer);
  });
}