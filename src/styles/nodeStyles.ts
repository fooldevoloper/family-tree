import { CSSProperties } from 'react';

export const getNodeStyle = (isConnection: boolean, borderColor: string): CSSProperties => ({
  border: isConnection ? 'none' : `2px solid ${borderColor}`,
  padding: isConnection ? '0' : '8px',
  width: isConnection ? '40px' : '180px',
  height: isConnection ? '40px' : 'auto',
  boxShadow: isConnection ? 'none' : '0 2px 8px rgba(0,0,0,0.1)',
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: isConnection ? 'transparent' : '#fff',
  cursor: isConnection ? 'pointer' : 'default',
});

export const getButtonStyle = (isSpouse: boolean, borderColor: string): React.CSSProperties => ({
  position: 'absolute',
  right: isSpouse ? 'auto' : '-12px',
  left: isSpouse ? '-12px' : 'auto',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 1,
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  background: borderColor,
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
});

export const getConnectionButtonStyle = (borderColor: string): React.CSSProperties => ({
  position: 'absolute',
  zIndex: 1,
  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
  background: borderColor,
  border: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
});
