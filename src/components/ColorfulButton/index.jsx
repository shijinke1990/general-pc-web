import React from 'react';

export default function index({ text, ...props }) {
  return <button {...props}>{text}</button>;
}
