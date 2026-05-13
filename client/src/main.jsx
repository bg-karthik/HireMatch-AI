import React from "react";

import ReactDOM from "react-dom/client";

import {
  BrowserRouter,
} from "react-router-dom";

import { pdfjs } from "react-pdf";

import App from "./App.jsx";

import "./index.css";

/* PDF.JS CONFIG */
pdfjs.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

pdfjs.GlobalWorkerOptions.standardFontDataUrl =
  `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`;

const rootElement =
  document.getElementById("root");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);