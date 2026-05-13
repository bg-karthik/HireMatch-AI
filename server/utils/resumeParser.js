import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

/* =========================================
   PARSE RESUME
========================================= */

export async function parseResume(
  fileBuffer
) {
  try {
    // VALIDATE BUFFER
    if (
      !fileBuffer ||
      fileBuffer.length === 0
    ) {
      throw new Error(
        "Received empty buffer"
      );
    }

    // BUFFER -> UINT8ARRAY
    const uint8Array =
      new Uint8Array(
        fileBuffer.buffer,
        fileBuffer.byteOffset,
        fileBuffer.byteLength
      );

    // LOAD PDF
    const loadingTask =
      pdfjsLib.getDocument({
        data: uint8Array,

        disableFontFace: true,

        useSystemFonts: true,
      });

    const pdf =
      await loadingTask.promise;

    let extractedText = "";

    // READ ALL PAGES
    for (
      let pageNum = 1;
      pageNum <= pdf.numPages;
      pageNum++
    ) {
      const page =
        await pdf.getPage(pageNum);

      const content =
        await page.getTextContent();

      const strings =
        content.items.map(
          (item) => item.str
        );

      extractedText +=
        strings.join(" ") + "\n";
    }

    return extractedText.trim();

  } catch (error) {
    console.error(
      "PDF Parsing Error:",
      error
    );

    throw error;
  }
}