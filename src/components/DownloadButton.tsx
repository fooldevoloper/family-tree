import { DownloadOutlined } from "@ant-design/icons";
import { Button, Dropdown, MenuProps, Modal, message } from "antd";
import { toJpeg, toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { useCallback, useState } from "react";

interface DownloadButtonProps {
  containerId: string;
}

export function DownloadButton({ containerId }: DownloadButtonProps) {
  const [loading, setLoading] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const showDownloadConfirmation = (format: string) => {
    return new Promise<boolean>((resolve) => {
      Modal.confirm({
        title: 'Confirm Download',
        content: `Do you want to download the family tree as ${format.toUpperCase()}?`,
        okText: 'Yes',
        cancelText: 'No',
        onOk: () => resolve(true),
        onCancel: () => resolve(false),
      });
    });
  };

  const downloadImage = useCallback(
    async (format: "png" | "jpeg") => {
      const element = document.querySelector(
        `#${containerId} .react-flow__viewport`
      );
      if (!element) return;

      const confirmed = await showDownloadConfirmation(format);
      if (!confirmed) return;

      setLoading(true);
      messageApi.loading({ content: 'Preparing download...', key: 'download' });

      try {
        // Start processing in parallel
        const processPromise = format === "png"
          ? toPng(element as HTMLElement, {
              backgroundColor: "transparent",
              style: {
                backgroundColor: "transparent",
              },
            })
          : toJpeg(element as HTMLElement, {
              backgroundColor: "#ffffff",
              style: {
                backgroundColor: "#ffffff",
              },
            });

        // Update loading message
        messageApi.loading({ content: 'Processing image...', key: 'download' });

        const dataUrl = await processPromise;

        // Update success message
        messageApi.success({ content: 'Download ready!', key: 'download', duration: 2 });

        const link = document.createElement("a");
        link.download = `family-tree.${format}`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error("Error downloading image:", error);
        messageApi.error({ content: 'Download failed!', key: 'download', duration: 2 });
      } finally {
        setLoading(false);
      }
    },
    [containerId, messageApi]
  );

  const downloadPDF = useCallback(async () => {
    const element = document.querySelector(
      `#${containerId} .react-flow__viewport`
    );  
    if (!element) return;

    const confirmed = await showDownloadConfirmation('PDF');
    if (!confirmed) return;

    setLoading(true);
    messageApi.loading({ content: 'Preparing PDF...', key: 'download' });

    try {
      // Start processing in parallel
      const processPromise = toJpeg(element as HTMLElement, {
        backgroundColor: "#ffffff",
        style: {
          backgroundColor: "#ffffff",
        },
      });









      
      // Update loading message
      messageApi.loading({ content: 'Processing PDF...', key: 'download' });

      const dataUrl = await processPromise;
      
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [element.clientWidth, element.clientHeight],
      });

      pdf.addImage(
        dataUrl,
        "JPEG",
        0,
        0,
        element.clientWidth,
        element.clientHeight
      );

      // Update success message
      messageApi.success({ content: 'PDF ready!', key: 'download', duration: 2 });

      pdf.save("family-tree.pdf");
    } catch (error) {
      console.error("Error downloading PDF:", error);
      messageApi.error({ content: 'PDF download failed!', key: 'download', duration: 2 });
    } finally {
      setLoading(false);
    }
  }, [containerId, messageApi]);

  const items: MenuProps["items"] = [
    {
      key: "jpeg",
      label: "Download as JPEG",
      onClick: () => downloadImage("jpeg"),
      disabled: loading,
    },
    {
      key: "png",
      label: "Download as PNG",
      onClick: () => downloadImage("png"),
      disabled: loading,
    },
    {
      key: "pdf",
      label: "Download as PDF",
      onClick: downloadPDF,
      disabled: loading,
    },
  ];

  return (
    <>
      {contextHolder}
      <Dropdown menu={{ items }} placement="topRight">
        <Button type="primary" icon={<DownloadOutlined />} loading={loading}>
          Download
        </Button>
      </Dropdown>
    </>
  );
}
