import { Modal, Progress, Spin, message } from "antd";
import { useCallback, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const Footer: React.FC = () => {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  const handleExport = useCallback(async (type: "png" | "pdf") => {
    const canvasElement = document.getElementById("family-tree-container") as HTMLElement | null;
    if (!canvasElement) {
      message.error("Family tree container not found!");
      return;
    }

    try {
      setDownloading(true);
      setProgress(10);

      const canvas = await html2canvas(canvasElement, { scale: 1.5 ,useCORS: true});
      setProgress(50);

      if (type === "png") {
        const link = document.createElement("a");
        link.download = "family-tree.png";
        link.href = canvas.toDataURL("image/png", 0.7); // compressed PNG
        link.click();
      } else if (type === "pdf") {
        const imgData = canvas.toDataURL("image/jpeg", 0.7); // compressed JPEG
        const pdf = new jsPDF({
          orientation: "landscape",
          unit: "px",
          format: [canvas.width / 2, canvas.height / 2],
        });
        pdf.addImage(imgData, "JPEG", 0, 0, canvas.width / 2, canvas.height / 2);
        pdf.save("family-tree.pdf");
      }

      setProgress(100);
      message.success("Download completed!");
    } catch (error) {
      console.error(error);
      message.error("Failed to export!");
    } finally {
      setTimeout(() => {
        setDownloading(false);
        setProgress(0);
      }, 500);
    }
  }, []);

  const confirmDownload = (type: "png" | "pdf") => {
    Modal.confirm({
      title: "Are you sure you want to download?",
      content: `This will export the family tree as a ${type.toUpperCase()} file.`,
      okText: "Yes",
      cancelText: "No",
      onOk: () => handleExport(type),
    });
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        background: "#fff",
        padding: "10px 20px",
        borderTop: "1px solid #e8e8e8",
        display: "flex",
        justifyContent: "flex-end",
        gap: "10px",
        zIndex: 100,
      }}
    >
      {downloading && (
        <div style={{ position: "absolute", left: "20px", top: "10px" }}>
          <Spin spinning={true}>
            <Progress percent={progress} size="small" />
          </Spin>
        </div>
      )}
      <button
        style={{
          padding: "8px 16px",
          background: downloading ? "#ccc" : "#1890ff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: downloading ? "not-allowed" : "pointer",
        }}
        onClick={() => !downloading && confirmDownload("png")}
        disabled={downloading}
      >
        Export as PNG
      </button>
      <button
        style={{
          padding: "8px 16px",
          background: downloading ? "#ccc" : "#1890ff",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: downloading ? "not-allowed" : "pointer",
        }}
        onClick={() => !downloading && confirmDownload("pdf")}
        disabled={downloading}
      >
        Export as PDF
      </button>
    </div>
  );
};