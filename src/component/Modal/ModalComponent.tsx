import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // MUI-like sizes
  width?: string | number; // Custom width
  height?: string | number; // Custom height
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, size = 'md', width, height }) => {
  if (!isOpen) return null;

  const modalSizeStyles: { [key: string]: React.CSSProperties } = {
    xs: { width: '300px', height: 'auto' },
    sm: { width: '400px', height: 'auto' },
    md: { width: '500px', height: 'auto' },
    lg: { width: '700px', height: 'auto' },
    xl: { width: '900px', height: 'auto' },
  };

  const computedStyles = {
    ...styles.modal,
    ...(size ? modalSizeStyles[size] : {}),
    ...(width ? { width: typeof width === 'number' ? `${width}px` : width } : {}),
    ...(height ? { height: typeof height === 'number' ? `${height}px` : height } : {}),
  };

  return (
    <div style={styles.overlay}>
      <div style={computedStyles}>
        <button style={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

// Inline styles
const styles: { [key: string]: React.CSSProperties } = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
    position: 'absolute',
    maxWidth: '95vw', // Ensures responsiveness
    maxHeight: '90vh', // Ensures responsiveness
    overflowY: 'auto',
  },
  closeButton: {
    position: 'absolute',
    top: '10px',
    right: '15px',
    fontSize: '20px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
  },
};

export default Modal;
