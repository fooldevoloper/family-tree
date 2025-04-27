import { DownloadOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps } from "antd";
import { toJpeg, toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { useCallback } from "react";

interface DownloadButtonProps {
  containerId: string;
}

export function DownloadButton({ containerId }: DownloadButtonProps) {
  const downloadImage = useCallback(
    async (format: "png" | "jpeg") => {
      const element = document.querySelector(
        `#${containerId} .react-flow__viewport`
      );
      if (!element) return;

      try {
        const dataUrl =
          format === "png"
            ? await toPng(element as HTMLElement)
            : await toJpeg(element as HTMLElement);

        const link = document.createElement("a");
        link.download = `family-tree.${format}`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Error downloading image:", error);
      }
    },
    [containerId]
  );

  const downloadPDF = useCallback(async () => {
    const element = document.querySelector(
      `#${containerId} .react-flow__viewport`
    );
    if (!element) return;

    try {
      const dataUrl = await toPng(element as HTMLElement);
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [element.clientWidth, element.clientHeight],
      });

      pdf.addImage(
        dataUrl,
        "PNG",
        0,
        0,
        element.clientWidth,
        element.clientHeight
      );
      pdf.save("family-tree.pdf");
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  }, [containerId]);

  const items: MenuProps["items"] = [
    {
      key: "jpeg",
      label: "Download as JPEG",
      onClick: () => downloadImage("jpeg"),
    },
    {
      key: "png",
      label: "Download as PNG",
      onClick: () => downloadImage("png"),
    },
    {
      key: "pdf",
      label: "Download as PDF",
      onClick: downloadPDF,
    },
  ];

  return (
    <Dropdown menu={{ items }} placement="topRight">
      <Button type="primary" icon={<DownloadOutlined />}>
        Download
      </Button>
    </Dropdown>
  );
}
