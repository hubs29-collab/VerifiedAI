import { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import Seo from "@/components/Seo";

const API = "https://ebb700d3-0624-496c-8a99-8d7888669f68-00-2wqp9jjowl32z.picard.replit.dev";

interface VerificationResult {
  verdict: string;
  confidence: string;
  explanation: string;
}

function getResultColor(verdict: string): string {
  if (verdict.includes("PARTIALLY")) return "orange";
  if (verdict.includes("SUPPORTED")) return "green";
  return "red";
}

export default function Home() {
  const [currentJobId, setCurrentJobId] = useState<string | null>(null);
  const [statusLine, setStatusLine] = useState("");
  const [output, setOutput] = useState("");
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [emailTo, setEmailTo] = useState("");
  const [emailSending, setEmailSending] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // TODO: Replace with your Stripe payment link
  const STRIPE_PAYMENT_LINK = "https://buy.stripe.com/YOUR_LINK_HERE";

  async function startVerification() {
    setStatusLine("Creating verification...");
    
    try {
      const res = await fetch(`${API}/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trade: "General" })
      });

      const data = await res.json();
      setCurrentJobId(data.id);
      setOutput(`<strong>Verification ID:</strong> ${data.id}<br/>Status: Waiting for evidence`);
      setStatusLine("Verification created. Awaiting evidence.");
    } catch (err) {
      setStatusLine("Error creating verification.");
    }
  }

  async function uploadEvidence() {
    if (!currentJobId) {
      alert("Start a verification first");
      return;
    }

    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      alert("Select a file");
      return;
    }

    setStatusLine("Uploading and locking evidence...");

    try {
      const formData = new FormData();
      formData.append("files", file);

      await fetch(`${API}/evidence/${currentJobId}`, {
        method: "POST",
        body: formData
      });

      setStatusLine("Evidence locked. Generating result...");

      const res = await fetch(`${API}/results/${currentJobId}`);
      const data = await res.json();
      setResult(data);
      setStatusLine("Verification complete.");
      setIsComplete(true);
    } catch (err) {
      setStatusLine("Error uploading evidence.");
    }
  }

  function downloadPDF() {
    // Redirect to Stripe payment
    window.location.href = STRIPE_PAYMENT_LINK;
  }

  async function sendReportEmail() {
    if (!emailTo || !result || !currentJobId) {
      alert("Enter a valid email address");
      return;
    }

    setEmailSending(true);
    try {
      const emailjs = (window as any).emailjs;
      await emailjs.send("service_srfgy0f", "template_z4eqm1d", {
        to_email: emailTo,
        from_name: "VerifiedAI",
        message: `Verification Report\n\nVerification ID: ${currentJobId}\nResult: ${result.verdict}\nConfidence: ${result.confidence}\n\nExplanation:\n${result.explanation}\n\nGenerated: ${new Date().toLocaleString()}`,
      });
      setEmailSent(true);
    } catch (err) {
      alert("Failed to send email. Please try again.");
    } finally {
      setEmailSending(false);
    }
  }

  return (
    <>
      <Seo title="VerifiedAI" description="Verify before you agree." canonicalPath="/" />
      
      <div style={{
        fontFamily: "Arial, sans-serif",
        background: "#f5f7fb",
        minHeight: "100vh",
        padding: "30px"
      }}>
        <div style={{
          background: "#fff",
          maxWidth: "650px",
          margin: "auto",
          padding: "25px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)"
        }}>
          <h1 style={{ marginTop: 0 }} data-testid="title">VerifiedAI</h1>
          <p>Verify before you agree.</p>

          <button
            onClick={startVerification}
            disabled={isComplete}
            style={{
              padding: "10px 16px",
              border: "none",
              borderRadius: "6px",
              cursor: isComplete ? "not-allowed" : "pointer",
              background: isComplete ? "#9ca3af" : "#2563eb",
              color: "#fff",
              fontSize: "14px"
            }}
            data-testid="button-start-verification"
          >
            Start a Verification
          </button>

          {output && (
            <div
              style={{ marginTop: "15px", color: "#555" }}
              dangerouslySetInnerHTML={{ __html: output }}
              data-testid="output"
            />
          )}

          <div style={{ marginTop: "15px" }}>
            <input
              type="file"
              ref={fileInputRef}
              style={{ marginTop: "10px" }}
              data-testid="input-evidence-file"
            />
            <br /><br />
            <button
              onClick={uploadEvidence}
              disabled={isComplete}
              style={{
                padding: "10px 16px",
                border: "none",
                borderRadius: "6px",
                cursor: isComplete ? "not-allowed" : "pointer",
                background: isComplete ? "#9ca3af" : "#2563eb",
                color: "#fff",
                fontSize: "14px"
              }}
              data-testid="button-upload-evidence"
            >
              Upload Evidence
            </button>
          </div>

          {statusLine && (
            <div style={{ marginTop: "15px", color: "#555" }} data-testid="status-line">
              {statusLine}
            </div>
          )}

          {result && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px",
                borderRadius: "8px",
                background: "#f9fafb"
              }}
              data-testid="result-box"
            >
              <h3 style={{ color: getResultColor(result.verdict) }} data-testid="verdict-result">
                {result.verdict}
              </h3>
              <strong>Confidence:</strong> <span data-testid="verdict-confidence">{result.confidence}</span>
              <br /><br />
              <strong>Explanation:</strong><br />
              <span data-testid="verdict-explanation">{result.explanation}</span>
            </div>
          )}

          {isComplete && (
            <div style={{ marginTop: "20px" }}>
              <button
                onClick={downloadPDF}
                style={{
                  padding: "10px 16px",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  background: "#2563eb",
                  color: "#fff",
                  fontSize: "14px"
                }}
                data-testid="button-download-pdf"
              >
                Download Report (PDF)
              </button>

              <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid #e5e7eb" }}>
                <p style={{ marginBottom: "10px", fontWeight: "bold" }}>Email Report</p>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    value={emailTo}
                    onChange={(e) => setEmailTo(e.target.value)}
                    disabled={emailSent}
                    style={{
                      padding: "10px 12px",
                      border: "1px solid #d1d5db",
                      borderRadius: "6px",
                      fontSize: "14px",
                      flex: "1",
                      minWidth: "200px"
                    }}
                    data-testid="input-email-report"
                  />
                  <button
                    onClick={sendReportEmail}
                    disabled={emailSending || emailSent}
                    style={{
                      padding: "10px 16px",
                      border: "none",
                      borderRadius: "6px",
                      cursor: emailSending || emailSent ? "not-allowed" : "pointer",
                      background: emailSent ? "#10b981" : emailSending ? "#9ca3af" : "#2563eb",
                      color: "#fff",
                      fontSize: "14px"
                    }}
                    data-testid="button-send-email"
                  >
                    {emailSent ? "Sent!" : emailSending ? "Sending..." : "Send Report"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
