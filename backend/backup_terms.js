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
    `http://192.168.1.126:8006/backup_terms_and_conditions`
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
  doc.text("Data back up and restore advisory", pageWidth / 2, 10, {
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
    "2. This advisory is applicable to cellular devices only and not units such as notebooks, PCs, etc.",
    10,
    30
  );

  // Term 3
  doc.setFontSize(10);
  doc.text(
    "3. Please note that software data backup and restore procedures are not covered under Samsung's warranty,",
    10,
    40
  );
  doc.text(
    "thus this portion of the repair can be performed but on a chargeable basis",
    10,
    45
  );

  // Term 4
  doc.setFontSize(10);
  doc.text(
    "4. Should the repair to your device entail a software reload or mainboard replacement, stored data will be",
    10,
    55
  );
  doc.text(
    "lost. If we are unable to access the defective device's data, we can attempt to back up and restore your data.",
    10,
    60
  );

  // Term 5
  doc.setFontSize(10);
  doc.text(
    "5. Data includes: Contacts, Media & Documents, which may be backed up and restored, if accessible and if not corrupted.",
    10,
    70
  );

  // Term 6
  doc.setFontSize(10);
  doc.text(
    "6. We do not back up and restore any non-factory standard applications, 3rd party applications (such as WhatsApp)",
    10,
    80
  );
  doc.setFontSize(10);
  doc.text("programs, Microsoft, or other Office suites.", 10, 85);
  doc.addImage(`${signaturePadData}`, "image/png", 78, 80, 10, 10);

  // Term 7
  doc.setFontSize(10);
  doc.text(
    "7. These will have to be uploaded and/or reinstalled again by yourself.",
    10,
    95
  );

  // Term 8
  doc.setFontSize(10);
  doc.text(
    "8. Service fee to undertake data backup and restore - R550",
    10,
    105
  );
  doc.addImage(`${signaturePadData}`, "image/png", 106, 100, 10, 10);

  // Term 9
  doc.setFontSize(10);
  doc.text(
    "9. Please note that the above relates specifically to devices that require resolutions whereby the stored data may be",
    10,
    115
  );
  doc.setFontSize(10);
  doc.text("affected in order to affect a successful repair.", 10, 120);

  // Term 10
  doc.setFontSize(10);
  doc.text(
    "10. Should the repair be of such a nature that the stored data will not be affected (e.g., LCD, battery replacement, etc.),",
    10,
    130
  );
  doc.setFontSize(10);
  doc.text(
    "then there's no backup and restore procedure required, and the service fee is then not applicable.",
    10,
    135
  );

  // Term 11
  doc.setFontSize(10);
  doc.text(
    "11. Although extreme care and all efforts are taken in order not to lose any data, neither Samsung nor its contracted",
    10,
    145
  );
  doc.setFontSize(10);
  doc.text(
    "service agent can be held unconditionally responsible and/or liable if your data is irretrievable, lost, or corrupted during",
    10,
    150
  );
  doc.setFontSize(10);
  doc.text("the repair process and/or backup and restore procedures.", 10, 155);

  // Term 12

  doc.setFontSize(10);
  doc.text(
    "12. As these procedures can take up to 3–5 hours, we recommend that you leave your device with us to allow enough",
    10,
    165
  );
  doc.setFontSize(10);
  doc.text(
    "time for the above to be performed in the proper manner. There is no charge (for data backup and restore) should your",
    10,
    170
  );
  doc.setFontSize(10);
  doc.text(
    "data be irretrievable if we are unable to successfully perform the backup and restore procedures or if the repair",
    10,
    175
  );
  doc.setFontSize(10);
  doc.text("is not software or main board related.", 10, 180);

  // Term 13

  doc.setFontSize(10);
  doc.text(
    "13. Should the quote not be accepted and the repair resolution is to undertake the required repairs to the device",
    10,
    190
  );
  doc.setFontSize(10);
  doc.text(
    "on a no-charge basis, all your stored data will be lost in the process.",
    10,
    195
  );

  // Term 14
  doc.setFontSize(10);
  doc.text(
    "14. The above terms and conditions are applicable to devices that are in and out of warranty.",
    10,
    205
  );

  // Term 15
  doc.setFontSize(10);
  doc.text(
    "15. However, should your device be out of the warranty period and have additional hardware-related fault(s),",
    10,
    215
  );
  doc.setFontSize(10);
  doc.text(
    "you will be quoted once the unit has undergone a technical assessment.",
    10,
    220
  );

  //
  doc.setFontSize(10);
  doc.text(
    "Upon signature of this document and / or document to which this document is attached shall signify your acceptance",
    10,
    230
  );
  doc.text("of the terms thereof.", 10, 235);

  doc.text(`Date: ${date}`, 10, 250);

  // canvas integration
  doc.rect(120, 250, 80, 40, "S");
  // Add canvas signature
  doc.addImage(`${signaturePadData}`, "image/png", 128, 250, 80, 40);

  if (signaturePad.isEmpty()) {
    signaturePadErrorText.style.display = "block";
    signaturePadErrorText.innerHTML = "Please enter a signature";
    return false;
  } else if (agreeWithTermsCheckbox.checked === !true) {
    agreeWithTermsCheckboxErrorText.style.display = "block";
    agreeWithTermsCheckboxErrorText.innerHTML = "Please agree to the terms";
    return false;
  } else {
    doc.save(`Backup advisory_${date}.pdf`);
  }
});
