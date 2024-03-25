const signaturePad = new SignaturePad(
  document.getElementById("signature-pad"),
  {
    backgroundColor: "rgba(255, 255, 255, 0)",
    penColor: "rgb(0, 0, 0)",
    dotSize: 1,
  }
);

window.jsPDF = window.jspdf.jsPDF;

const table = document.querySelector("#my-table");

const date = new Date(Date.now() + 1000 * 60 * -new Date().getTimezoneOffset())
  .toISOString()
  .replace("T", " ")
  .replace("Z", "");

const agreeWithTermsCheckbox = document.getElementById("terms_agree");
const signaturePadErrorText = document.querySelector(".signature-pad_error");
const agreeWithTermsCheckboxErrorText =
  document.querySelector(".checkbox_error");

const fetchTerms = async () => {
  const terms = document.querySelector(".terms");
  const response = await fetch(
    `http://192.168.1.126:8006/terms_and_conditions`
  );
  const data = await response.json();

  data.map((item, index) => {
    if (item.is_bold === true) {
      terms.innerHTML += `<p class="term bold_term">${index + 1}. ${
        item.term_description
      } </p>`;
    } else {
      terms.innerHTML += `<p class="term">${index + 1}. ${
        item.term_description
      } </p>`;
    }
  });
};
fetchTerms();

document.querySelector(".print_terms_button").addEventListener("click", () => {
  const doc = new jsPDF();
  var pageWidth =
    doc.internal.pageSize.width || doc.internal.pageSize.getWidth();

  doc.setFontSize(16);
  doc.text("Terms and conditions", pageWidth / 2, 10, {
    align: "center",
  });

  const signaturePadData = signaturePad
    .toDataURL("image/png")
    .replace("image/png", "image/octet-stream");

  // Term 1
  doc.setFontSize(10);
  doc.text(
    "1. In order to protect your property, repairs will only be returned upon presentation of your receipt.",
    10,
    20
  );

  // Term 2
  doc.setFontSize(10);
  doc.text(
    "2. When handing over your product for repair, please remove your SIM card, battery, charger, and accessories.",
    10,
    30
  );
  doc.text(
    "Samsung and/or its Authorized Service Center will not be liable for any loss of SIM card, battery, charger, or any other",
    10,
    35
  );
  doc.text(
    "accessory unless duly signed in at the time of handing the product for repair.",
    10,
    40
  );

  // Term 3
  doc.setFontSize(10);
  doc.text(
    "3. Samsung and/or its authorized service center will not be held liable for any loss incurred as a result of robbery or",
    10,
    50
  );
  doc.text("forced entry to our premises.", 10, 55);

  // Term 4

  doc.setFontSize(10);
  doc.text(
    "4. Any repairs not collected within 30 days of repair completion, after notification to the customer, will be sold to",
    10,
    65
  );
  doc.text("defray expenses.", 10, 70);
  doc.addImage(`${signaturePadData}`, "image/png", 36, 65, 10, 10);

  // Term 5
  doc.setFontSize(10);
  doc.text(
    "5. Samsung and/or its authorized service center will be deemed authorized to undertake any repairs should the cost",
    10,
    80
  );
  doc.text(
    "be less than the minimum amount of the quotation provided by Samsung and/or its authorized service center",
    10,
    85
  );

  // Term 6
  doc.setFontSize(10);

  doc.text(
    "6. This service order or job card does not authorize any exchange for your device. All exchanges for a device must be",
    10,
    95
  );
  doc.text("authorized separately in writing by Samsung.", 10, 100);
  doc.text(
    "Any handwritten notes made on this service order or job card that provide for an exchange of the device that is granted",
    10,
    105
  );
  doc.text(
    "verbally by Samsung or its authorized service center are not permitted, and an exchange of your device will",
    10,
    110
  );
  doc.text("not be provided in such instances.", 10, 115);

  // Term 7
  doc.setFontSize(10);
  doc.text(
    "7. Once the quotation is accepted by yourself, Samsung will be deemed authorized to replace parts and materials",
    10,
    120
  );
  doc.text(
    "as may be necessary, provided the costs do not exceed the value of the quotation provided.",
    10,
    125
  );

  // Term 8
  doc.setFontSize(10);

  doc.text(
    "8. A minimum assessment or quotation rejection fee of R250 will be charged on all repairs that are not covered by the",
    10,
    135
  );
  doc.text("manufacturer warranty terms and conditions.", 10, 140);
  doc.addImage(`${signaturePadData}`, "image/png", 80, 135, 10, 10);

  // Term 10
  doc.setFontSize(10);
  doc.text(
    "10. Repairs to liquid- or corrosion-damaged products will not be performed under warranty conditions. This is",
    10,
    150
  );
  doc.text(
    "specified within the owner's manual warranty terms and conditions. Repair, however, can be offered at a cost to you.",
    10,
    155
  );
  doc.text("the end-user.", 10, 160);

  // Term 11
  doc.setFontSize(10);
  doc.text(
    "11. All repairs undertaken, save those in respect of corrosion, physical damage, and/or liquid damage, are",
    10,
    170
  );
  doc.text(
    "guaranteed against faulty workmanship for a maximum period of 90 days from the date of receipt by the customer",
    10,
    175
  );

  // Term 12
  doc.setFontSize(10);

  doc.text(
    "12. Samsung and/or its authorized service center will not be responsible for the loss of any data on any phone",
    10,
    185
  );
  doc.text(
    "handed in for repair. It is your responsibility to ensure that all data is backed up safely.",
    10,
    190
  );
  doc.addImage(`${signaturePadData}`, "image/png", 150, 186, 10, 10);

  doc.text(
    "Upon signature of this document and / or document to which this document is attached shall signify your acceptance",
    10,
    210
  );
  doc.text("of the terms thereof.", 10, 215);

  doc.text(`Date: ${date}`, 10, 225);

  // canvas integration
  doc.rect(120, 240, 80, 50, "S");
  // Add canvas signature
  doc.addImage(`${signaturePadData}`, "image/png", 128, 250, 80, 50);

  if (signaturePad.isEmpty()) {
    signaturePadErrorText.style.display = "block";
    signaturePadErrorText.innerHTML = "Please enter a signature";
    return false;
  } else if (agreeWithTermsCheckbox.checked === !true) {
    agreeWithTermsCheckboxErrorText.style.display = "block";
    agreeWithTermsCheckboxErrorText.innerHTML = "Please agree to the terms";
    return false;
  } else {
    doc.save(`test.pdf`);
  }
});
