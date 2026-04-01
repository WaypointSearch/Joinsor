import { useState, useRef } from "react";
import {
  COLORS,
  SQUARE_CHECKOUT_URL,
  WEBHOOK_URL,
  BROKER_PHONE,
  ONBOARDING_STEP_LABELS,
  DOCUMENT_KEYS,
  DOCUMENT_TITLES,
  INPUT_STYLE,
  LABEL_STYLE,
} from "../constants";
import { getDocuments } from "../data/getDocuments";
import SignaturePad from "./SignaturePad";
import DocViewer from "./DocViewer";

const INITIAL_FORM_STATE = {
  fullName: "", email: "", phone: "", licenseNumber: "", licenseType: "sales_associate",
  address: "", city: "", state: "FL", zip: "", taxClass: "individual", ssn: "", ein: "", bizName: "",
};

const INITIAL_DOC_AGREEMENT_STATE = { ica: false, policy: false, showing: false, subscription: false, dbpr: false, w9: false };

const DOCUMENT_FULL_NAMES = {
  ica: "Independent Contractor Agreement (ICA-7)",
  policy: "Sun Ocean Realty Office Policy Form",
  showing: "Showing Agent Addendum",
  subscription: "Agent Annual Subscription Agreement",
  dbpr: "DBPR RE 11 – Change of Status",
  w9: "Form W-9 – Taxpayer Identification",
};

export default function OnboardingModal({ onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [signatureImage, setSignatureImage] = useState(null);
  const [documentAgreements, setDocumentAgreements] = useState(INITIAL_DOC_AGREEMENT_STATE);
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [driversLicenseFile, setDriversLicenseFile] = useState(null);
  const [driversLicensePreview, setDriversLicensePreview] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const modalScrollRef = useRef(null);

  const documents = getDocuments(formData);
  const currentDocKey = DOCUMENT_KEYS[currentDocIndex];
  const agreedCount = DOCUMENT_KEYS.filter((k) => documentAgreements[k]).length;

  function updateFormField(fieldName, value) {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    setValidationErrors((prev) => ({ ...prev, [fieldName]: undefined }));
  }

  function scrollModalToTop() { modalScrollRef.current?.scrollTo(0, 0); }

  function validateCurrentStep() {
    const errors = {};
    if (currentStep === 0) {
      if (!formData.fullName.trim()) errors.fullName = "Required";
      if (!formData.email.includes("@")) errors.email = "Valid email required";
      if (!formData.phone.trim()) errors.phone = "Required";
      if (!formData.licenseNumber.trim()) errors.licenseNumber = "Required";
      if (!formData.address.trim()) errors.address = "Required";
      if (!formData.city.trim()) errors.city = "Required";
      if (!formData.zip.trim()) errors.zip = "Required";
    } else if (currentStep === 1) {
      if (!documentAgreements[currentDocKey]) errors.docs = "Please check the box to agree to the " + DOCUMENT_TITLES[currentDocKey];
    } else if (currentStep === 2) {
      if (!signatureImage) errors.sig = "Please sign above";
    } else if (currentStep === 3) {
      if (formData.taxClass === "individual" && !formData.ssn.trim()) errors.ssn = "SSN required";
      if (formData.taxClass !== "individual" && !formData.ein.trim()) errors.ein = "EIN required";
    } else if (currentStep === 4) {
      if (!driversLicenseFile) errors.dl = "Please upload your driver's license";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function generateSignedDocumentHtml() {
    const today = new Date().toLocaleDateString();
    const licenseLine = (formData.licenseType === "sales_associate" ? "SL" : "BK/BL") + formData.licenseNumber;
    let html = '<!DOCTYPE html><html><head><meta charset="utf-8"><style>body{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;line-height:1.6;color:#333;margin:0;padding:20px 30px;font-size:11.5px}h1{text-align:center;font-size:16px;border-bottom:2px solid #0a1628;padding-bottom:8px;color:#0a1628;margin:0 0 16px}h2{font-size:13px;margin:16px 0 6px;color:#0a1628}p{margin:6px 0}.field{background:#f0f7ff;padding:5px 10px;border:1px solid #cde0f2;margin:6px 0;border-radius:2px;font-size:11px}.indent{margin-left:18px}.highlight{border-left:3px solid #c9a84c;padding:6px 10px;background:#fafaf7;margin:8px 0}.sig-block{margin-top:24px;padding-top:14px;border-top:1px solid #ccc;page-break-inside:avoid}.sig-block table{width:100%;border-collapse:collapse}.sig-block td{padding:4px;vertical-align:top}.page-break{page-break-after:always}.watermark{text-align:center;font-size:9px;color:#999;margin-top:20px;border-top:1px solid #eee;padding-top:8px}</style></head><body>';
    html += '<div style="text-align:center;padding:60px 0 40px"><div style="font-size:24px;color:#0a1628;font-weight:700;letter-spacing:2px">SUN OCEAN REALTY</div><div style="font-size:11px;color:#c9a84c;letter-spacing:4px;margin-top:4px">LLC</div><div style="width:60px;height:2px;background:#c9a84c;margin:20px auto"></div><div style="font-size:14px;color:#333;margin-top:16px">Agent Onboarding Documents</div><div style="font-size:12px;color:#666;margin-top:8px">Executed by: <strong>' + formData.fullName + '</strong></div><div style="font-size:11px;color:#999;margin-top:4px">License: ' + licenseLine + ' &middot; Date: ' + today + '</div></div><div class="page-break"></div>';
    DOCUMENT_KEYS.filter((key) => documentAgreements[key]).forEach((key, idx, arr) => {
      const doc = documents[key];
      html += "<h1>" + doc.title + "</h1>";
      doc.content.forEach((b) => {
        if (b.type === "h") html += '<h2 style="text-align:center">' + b.text.replace(/\n/g, "<br/>") + "</h2>";
        else if (b.type === "f") html += '<div class="field"><strong>' + b.label + ":</strong> " + (b.value || "") + "</div>";
        else if (b.type === "p") html += "<p>" + b.text.replace(/\n/g, "<br/>") + "</p>";
        else if (b.type === "s") html += "<p><strong>" + (b.n ? b.n + ". " : "") + b.t + (b.text ? ":" : "") + "</strong> " + (b.text ? b.text.replace(/\n/g, "<br/>") : "") + "</p>";
        else if (b.type === "sub") html += '<p class="indent"><strong>' + b.l + ":</strong> " + b.text.replace(/\n/g, "<br/>") + "</p>";
        else if (b.type === "b") html += '<div class="highlight"><strong>' + b.l + ":</strong><br/>" + b.text + "</div>";
        else if (b.type === "sig") html += '<div class="sig-block"><table><tr><td width="50%"><strong>BROKER</strong><br/><em style="color:#0a1628">' + b.broker + '</em><br/><span style="font-size:10px;color:#666">' + b.brokerage + " &middot; " + b.brokerDate + '</span></td><td width="50%"><strong>ASSOCIATE</strong><br/><img src="' + signatureImage + '" style="height:36px;display:block;margin:4px 0" /><span style="font-size:10px;color:#666">' + formData.fullName + " &middot; " + today + "</span></td></tr></table></div>";
        else if (b.type === "sl") html += '<div class="sig-block"><strong>LICENSEE SIGNATURE</strong><br/><img src="' + signatureImage + '" style="height:36px;display:block;margin:4px 0" /><span style="font-size:10px;color:#666">' + formData.fullName + " &middot; " + today + "</span></div>";
      });
      html += '<div class="watermark">Sun Ocean Realty LLC &middot; Broker: Enrique L. Guillen #3265449 &middot; C1056011<br/>E-signed ' + new Date().toISOString() + " via joinsor.com</div>";
      if (idx < arr.length - 1) html += '<div class="page-break"></div>';
    });
    html += "</body></html>";
    return html;
  }

  async function handleSubmitToBackend() {
    setIsSubmitting(true);
    setSubmitError(null);
    const payload = {
      form: { fullName: formData.fullName, email: formData.email, phone: formData.phone, licenseNumber: formData.licenseNumber, licenseType: formData.licenseType, address: formData.address, city: formData.city, state: formData.state, zip: formData.zip, taxClass: formData.taxClass, ssn: formData.taxClass === "individual" ? formData.ssn : undefined, ein: formData.taxClass !== "individual" ? formData.ein : undefined, bizName: formData.bizName || undefined },
      signature: signatureImage,
      driversLicense: driversLicensePreview,
      documentsAgreed: DOCUMENT_KEYS.filter((key) => documentAgreements[key]),
      signedHtml: generateSignedDocumentHtml(),
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
    };
    try {
      await fetch(WEBHOOK_URL, { method: "POST", mode: "no-cors", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(payload) });
      setIsComplete(true);
      window.open(SQUARE_CHECKOUT_URL, "_blank");
    } catch (error) {
      console.error("Signup submission failed:", error);
      setSubmitError("There was a problem saving your application. Please try again, or call/text " + BROKER_PHONE + " for help.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleNextStep() {
    if (!validateCurrentStep()) return;
    if (currentStep === 1 && currentDocIndex < DOCUMENT_KEYS.length - 1) {
      setCurrentDocIndex((prev) => prev + 1);
      setValidationErrors({});
      scrollModalToTop();
      return;
    }
    if (currentStep === 5) { handleSubmitToBackend(); return; }
    setCurrentStep((prev) => prev + 1);
    scrollModalToTop();
  }

  function handlePreviousStep() {
    if (currentStep === 1 && currentDocIndex > 0) { setCurrentDocIndex((prev) => prev - 1); setValidationErrors({}); scrollModalToTop(); return; }
    setCurrentStep((prev) => Math.max(0, prev - 1));
    scrollModalToTop();
  }

  function handleDriversLicenseUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    setDriversLicenseFile(file);
    setValidationErrors((prev) => ({ ...prev, dl: undefined }));
    const reader = new FileReader();
    reader.onload = (re) => setDriversLicensePreview(re.target.result);
    reader.readAsDataURL(file);
  }

  function FieldError({ field }) {
    if (!validationErrors[field]) return null;
    return <span style={{ color: COLORS.red, fontSize: "0.75rem", fontFamily: "'Outfit', sans-serif" }}>{validationErrors[field]}</span>;
  }

  function getNextButtonLabel() {
    if (isSubmitting) return "Saving...";
    if (currentStep === 5) return "Complete & Pay $99 \u2192";
    if (currentStep === 1 && currentDocIndex < DOCUMENT_KEYS.length - 1) return "Agree & Next Document \u2192";
    return "Continue \u2192";
  }

  if (isComplete) {
    return (
      <div style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(10,22,40,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ background: COLORS.sand, borderRadius: 4, maxWidth: 500, width: "100%", padding: 48, textAlign: "center" }}>
          <div style={{ fontSize: "3rem", marginBottom: 16 }}>✦</div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.6rem", color: COLORS.navy, margin: "0 0 12px" }}>Submission Successful</h2>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.95rem", color: COLORS.slate, lineHeight: 1.7, margin: "0 0 16px", fontWeight: 300 }}>Your signed application has been received. Complete your $99 payment on Square to finish joining Sun Ocean Realty.</p>
          <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: COLORS.slate, lineHeight: 1.7, margin: "0 0 32px", fontWeight: 300 }}>Your signed documents have been emailed to <strong>{formData.email}</strong>. The broker will be in contact with you very soon for CRM onboarding.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <a href={SQUARE_CHECKOUT_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: COLORS.gold, color: COLORS.navy, padding: "14px 32px", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 600, borderRadius: 2, textDecoration: "none" }}>Complete Payment</a>
            <button onClick={onClose} style={{ background: "none", border: "1px solid " + COLORS.warmSand, padding: "14px 24px", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: COLORS.slate, cursor: "pointer", borderRadius: 2 }}>Close</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 2000, background: "rgba(10,22,40,0.85)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div ref={modalScrollRef} style={{ background: COLORS.sand, borderRadius: 4, maxWidth: 700, width: "100%", maxHeight: "92vh", overflow: "auto" }}>
        <div style={{ position: "sticky", top: 0, background: COLORS.navy, padding: "20px 28px", zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: COLORS.gold, textTransform: "uppercase", marginBottom: 2 }}>Join Sun Ocean Realty</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: COLORS.white }}>{currentStep === 1 ? "Document " + (currentDocIndex + 1) + " of " + DOCUMENT_KEYS.length : ONBOARDING_STEP_LABELS[currentStep]}</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: "1.4rem", cursor: "pointer", padding: 8, lineHeight: 1 }}>✕</button>
        </div>
        <div style={{ padding: "28px 28px 32px" }}>
          {/* Step indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 28, flexWrap: "wrap" }}>
            {ONBOARDING_STEP_LABELS.map((_, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <div style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", fontWeight: 600, background: index < currentStep ? COLORS.gold : index === currentStep ? COLORS.navy : COLORS.warmSand, color: index <= currentStep ? COLORS.white : COLORS.slate, transition: "all 0.3s" }}>{index < currentStep ? "\u2713" : index + 1}</div>
                {index < ONBOARDING_STEP_LABELS.length - 1 && <div style={{ width: 12, height: 1, background: COLORS.warmSand }} />}
              </div>
            ))}
          </div>

          {/* STEP 0 */}
          {currentStep === 0 && (
            <div style={{ display: "grid", gap: 14 }}>
              <div><label style={LABEL_STYLE}>Full Legal Name *</label><input style={INPUT_STYLE} value={formData.fullName} onChange={(e) => updateFormField("fullName", e.target.value)} placeholder="John A. Smith" /><FieldError field="fullName" /></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><label style={LABEL_STYLE}>Email *</label><input style={INPUT_STYLE} type="email" value={formData.email} onChange={(e) => updateFormField("email", e.target.value)} placeholder="agent@email.com" /><FieldError field="email" /></div>
                <div><label style={LABEL_STYLE}>Phone *</label><input style={INPUT_STYLE} type="tel" value={formData.phone} onChange={(e) => updateFormField("phone", e.target.value)} placeholder="(555) 555-5555" /><FieldError field="phone" /></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div><label style={LABEL_STYLE}>License Type *</label><select style={INPUT_STYLE} value={formData.licenseType} onChange={(e) => updateFormField("licenseType", e.target.value)}><option value="sales_associate">Sales Associate (SL)</option><option value="broker_associate">Broker Associate (BK/BL)</option></select></div>
                <div><label style={LABEL_STYLE}>License Number *</label><input style={INPUT_STYLE} value={formData.licenseNumber} onChange={(e) => updateFormField("licenseNumber", e.target.value)} placeholder="1234567" /><FieldError field="licenseNumber" /></div>
              </div>
              <div><label style={LABEL_STYLE}>Mailing Address *</label><input style={INPUT_STYLE} value={formData.address} onChange={(e) => updateFormField("address", e.target.value)} placeholder="123 Main St" /><FieldError field="address" /></div>
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 12 }}>
                <div><label style={LABEL_STYLE}>City *</label><input style={INPUT_STYLE} value={formData.city} onChange={(e) => updateFormField("city", e.target.value)} placeholder="Fort Lauderdale" /><FieldError field="city" /></div>
                <div><label style={LABEL_STYLE}>State</label><input style={INPUT_STYLE} value={formData.state} onChange={(e) => updateFormField("state", e.target.value)} /></div>
                <div><label style={LABEL_STYLE}>ZIP *</label><input style={INPUT_STYLE} value={formData.zip} onChange={(e) => updateFormField("zip", e.target.value)} placeholder="33301" /><FieldError field="zip" /></div>
              </div>
            </div>
          )}

          {/* STEP 1: SEQUENTIAL DOCUMENT REVIEW */}
          {currentStep === 1 && (
            <div>
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", color: COLORS.navy, fontWeight: 600 }}>{DOCUMENT_FULL_NAMES[currentDocKey]}</span>
                  <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", color: COLORS.slate }}>{agreedCount} of {DOCUMENT_KEYS.length} complete</span>
                </div>
                <div style={{ height: 4, background: COLORS.warmSand, borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: (agreedCount / DOCUMENT_KEYS.length * 100) + "%", background: COLORS.gold, borderRadius: 2, transition: "width 0.4s ease" }} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
                {DOCUMENT_KEYS.map((key, index) => (
                  <div key={key} style={{ width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.65rem", fontFamily: "'Outfit', sans-serif", fontWeight: 600, background: documentAgreements[key] ? COLORS.gold : index === currentDocIndex ? COLORS.navy : COLORS.warmSand, color: documentAgreements[key] || index === currentDocIndex ? COLORS.white : COLORS.slate, transition: "all 0.3s" }} title={DOCUMENT_TITLES[key]}>{documentAgreements[key] ? "\u2713" : index + 1}</div>
                ))}
              </div>
              <DocViewer document={documents[currentDocKey]} formData={formData} signatureImage={signatureImage} />
              <label style={{ display: "flex", gap: 10, cursor: "pointer", alignItems: "flex-start", padding: "14px 16px", background: COLORS.white, borderRadius: 3, border: "1px solid " + (documentAgreements[currentDocKey] ? COLORS.gold : COLORS.warmSand), marginTop: 12, transition: "border-color 0.3s" }}>
                <input type="checkbox" checked={documentAgreements[currentDocKey]} onChange={() => { setDocumentAgreements((prev) => ({ ...prev, [currentDocKey]: !prev[currentDocKey] })); setValidationErrors({}); }} style={{ marginTop: 3, accentColor: COLORS.gold, width: 18, height: 18, flexShrink: 0 }} />
                <span style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: COLORS.navy, fontWeight: 500 }}>I have read and agree to the {DOCUMENT_FULL_NAMES[currentDocKey]}</span>
              </label>
              {validationErrors.docs && <p style={{ color: COLORS.red, fontSize: "0.8rem", fontFamily: "'Outfit', sans-serif", marginTop: 8 }}>{validationErrors.docs}</p>}
            </div>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: COLORS.slate, marginBottom: 8, fontWeight: 300 }}>Your signature will be applied to all 6 documents:</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 20 }}>{Object.values(DOCUMENT_TITLES).map((title, i) => <span key={i} style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", background: "rgba(201,168,76,0.12)", color: COLORS.navy, padding: "4px 10px", borderRadius: 2, fontWeight: 500 }}>{"\u2713"} {title}</span>)}</div>
              <div style={{ background: COLORS.white, padding: 20, borderRadius: 3, border: "1px solid " + COLORS.warmSand, marginBottom: 16 }}>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", color: COLORS.navy, margin: "0 0 4px", fontWeight: 600 }}>Signing as:</p>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: COLORS.slate, margin: "0 0 16px", fontWeight: 300 }}>{formData.fullName || "\u2014"} · {formData.licenseType === "sales_associate" ? "SL" : "BK/BL"}{formData.licenseNumber} · {new Date().toLocaleDateString()}</p>
                <SignaturePad onSave={setSignatureImage} savedSignature={signatureImage} />
              </div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", color: COLORS.slate, lineHeight: 1.6, fontWeight: 300, fontStyle: "italic" }}>By signing, you agree to all reviewed documents and consent to electronic business with Sun Ocean Realty LLC. Your signature, IP address, and timestamp are recorded as a legally binding e-signature under ESIGN and UETA.</p>
              {validationErrors.sig && <p style={{ color: COLORS.red, fontSize: "0.8rem", fontFamily: "'Outfit', sans-serif", marginTop: 8 }}>{validationErrors.sig}</p>}
            </div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: COLORS.slate, marginBottom: 20, fontWeight: 300 }}>Tax information for your W-9 and DBPR. Kept confidential.</p>
              <div style={{ background: COLORS.white, padding: 20, borderRadius: 3, border: "1px solid " + COLORS.warmSand, marginBottom: 16 }}>
                <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: COLORS.navy, margin: "0 0 16px", fontWeight: 600 }}>W-9 Information</h4>
                <div style={{ display: "grid", gap: 12 }}>
                  <div><label style={LABEL_STYLE}>Federal Tax Classification</label><select style={INPUT_STYLE} value={formData.taxClass} onChange={(e) => updateFormField("taxClass", e.target.value)}><option value="individual">Individual / Sole Proprietor</option><option value="llc_s">LLC (S-Corp)</option><option value="llc_c">LLC (C-Corp)</option><option value="llc_p">LLC (Partnership)</option><option value="s_corp">S Corporation</option><option value="c_corp">C Corporation</option></select></div>
                  {formData.taxClass !== "individual" && <div><label style={LABEL_STYLE}>Business Name</label><input style={INPUT_STYLE} value={formData.bizName} onChange={(e) => updateFormField("bizName", e.target.value)} placeholder="LLC or business name" /></div>}
                  {formData.taxClass === "individual" ? <div><label style={LABEL_STYLE}>SSN *</label><input style={INPUT_STYLE} type="password" value={formData.ssn} onChange={(e) => updateFormField("ssn", e.target.value)} placeholder="XXX-XX-XXXX" maxLength={11} /><FieldError field="ssn" /></div> : <div><label style={LABEL_STYLE}>EIN *</label><input style={INPUT_STYLE} value={formData.ein} onChange={(e) => updateFormField("ein", e.target.value)} placeholder="XX-XXXXXXX" maxLength={10} /><FieldError field="ein" /></div>}
                </div>
              </div>
              <div style={{ background: COLORS.white, padding: 20, borderRadius: 3, border: "1px solid " + COLORS.warmSand }}>
                <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: COLORS.navy, margin: "0 0 8px", fontWeight: 600 }}>DBPR RE 11 — License Transfer</h4>
                <div style={{ padding: "12px 16px", background: COLORS.sand, borderRadius: 2, fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", color: COLORS.navy }}><strong>Transferring to:</strong> Sun Ocean Realty LLC · C1056011 · Broker: Enrique L. Guillen #3265449</div>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
            <div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: COLORS.slate, marginBottom: 20, fontWeight: 300 }}>Upload a clear photo of the <strong>front</strong> of your driver's license.</p>
              {!driversLicensePreview ? (
                <label style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "2px dashed " + COLORS.warmSand, borderRadius: 4, padding: "48px 24px", cursor: "pointer", background: COLORS.white, textAlign: "center" }} onMouseOver={(e) => (e.currentTarget.style.borderColor = COLORS.gold)} onMouseOut={(e) => (e.currentTarget.style.borderColor = COLORS.warmSand)}>
                  <div style={{ fontSize: "2rem", marginBottom: 12, opacity: 0.3 }}>📄</div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: COLORS.navy, fontWeight: 500, marginBottom: 4 }}>Click to upload</div>
                  <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", color: COLORS.slate, fontWeight: 300 }}>Front of driver's license · JPG, PNG, or PDF</div>
                  <input type="file" accept="image/*,.pdf" onChange={handleDriversLicenseUpload} style={{ display: "none" }} />
                </label>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <img src={driversLicensePreview} alt="DL preview" style={{ maxWidth: "100%", maxHeight: 300, borderRadius: 4, border: "1px solid " + COLORS.warmSand, marginBottom: 12 }} />
                  <div><button onClick={() => { setDriversLicenseFile(null); setDriversLicensePreview(null); }} style={{ background: "none", border: "none", color: COLORS.red, fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", cursor: "pointer" }}>Remove & re-upload</button></div>
                </div>
              )}
              {validationErrors.dl && <p style={{ color: COLORS.red, fontSize: "0.8rem", fontFamily: "'Outfit', sans-serif", marginTop: 8 }}>{validationErrors.dl}</p>}
            </div>
          )}

          {/* STEP 5 */}
          {currentStep === 5 && (
            <div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: COLORS.slate, marginBottom: 20, fontWeight: 300 }}>Review your information, then pay $99 on Square to complete your sign-up.</p>
              <div style={{ background: COLORS.white, padding: 20, borderRadius: 3, border: "1px solid " + COLORS.warmSand, marginBottom: 16 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  {[["Name", formData.fullName], ["Email", formData.email], ["Phone", formData.phone], ["License", (formData.licenseType === "sales_associate" ? "SL" : "BK/BL") + " " + formData.licenseNumber], ["Address", formData.address + ", " + formData.city + ", " + formData.state + " " + formData.zip], ["Tax", formData.taxClass === "individual" ? "Individual" : formData.taxClass.replace("_", " ").toUpperCase()]].map(([label, value], i) => (
                    <div key={i}><div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", color: COLORS.slate, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 2 }}>{label}</div><div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.9rem", color: COLORS.navy, fontWeight: 500 }}>{value || "\u2014"}</div></div>
                  ))}
                </div>
              </div>
              <div style={{ background: COLORS.white, padding: 16, borderRadius: 3, border: "1px solid " + COLORS.warmSand, marginBottom: 16 }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", color: COLORS.navy, fontWeight: 600, marginBottom: 8 }}>Documents Signed</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>{Object.values(DOCUMENT_TITLES).map((title, i) => <span key={i} style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.7rem", background: "rgba(201,168,76,0.12)", color: COLORS.navy, padding: "4px 10px", borderRadius: 2, fontWeight: 500 }}>{"\u2713"} {title}</span>)}</div>
              </div>
              {driversLicensePreview && <div style={{ background: COLORS.white, padding: 16, borderRadius: 3, border: "1px solid " + COLORS.warmSand, marginBottom: 16, display: "flex", alignItems: "center", gap: 16 }}><img src={driversLicensePreview} alt="DL" style={{ width: 80, height: 50, objectFit: "cover", borderRadius: 3 }} /><div><div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.8rem", color: COLORS.navy, fontWeight: 600 }}>Driver's License</div><div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", color: COLORS.slate, fontWeight: 300 }}>Front uploaded ✓</div></div></div>}
              <div style={{ background: "rgba(201,168,76,0.08)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: 3, padding: "16px 20px", textAlign: "center" }}>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", color: COLORS.slate, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Total Due Today</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem", color: COLORS.navy, fontWeight: 700 }}>$99.00</div>
                <div style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", color: COLORS.slate, fontWeight: 300 }}>Annual subscription · Renews yearly</div>
              </div>
              <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.75rem", color: COLORS.slate, marginTop: 16, lineHeight: 1.6, fontWeight: 300, fontStyle: "italic", textAlign: "center" }}>You'll be redirected to Square. After payment, the broker will contact you for CRM onboarding.</p>
              {submitError && <div style={{ marginTop: 16, padding: "12px 16px", background: "rgba(220,38,38,0.08)", border: "1px solid rgba(220,38,38,0.2)", borderRadius: 3 }}><p style={{ fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: COLORS.red, margin: 0 }}>{submitError}</p></div>}
            </div>
          )}

          {/* NAV */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32, gap: 12 }}>
            {(currentStep > 0 || (currentStep === 1 && currentDocIndex > 0)) ? <button onClick={handlePreviousStep} disabled={isSubmitting} style={{ background: "none", border: "1px solid " + COLORS.warmSand, padding: "12px 28px", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", color: COLORS.slate, cursor: isSubmitting ? "not-allowed" : "pointer", borderRadius: 2, opacity: isSubmitting ? 0.5 : 1 }}>Back</button> : <div />}
            <button onClick={handleNextStep} disabled={isSubmitting} style={{ background: currentStep === 5 ? COLORS.gold : COLORS.navy, color: currentStep === 5 ? COLORS.navy : COLORS.white, border: "none", padding: "12px 32px", fontFamily: "'Outfit', sans-serif", fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, cursor: isSubmitting ? "not-allowed" : "pointer", borderRadius: 2, opacity: isSubmitting ? 0.7 : 1, minWidth: 200 }}>{getNextButtonLabel()}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
