import { CircularProgress } from '@mui/material';

export const Progress = () => {
  return <CircularProgress />;
};

export const TextWrapCellRenderer = ({ value }) => (
  <div style={{ whiteSpace: 'pre-wrap' }}>{value}</div>
);

export const ImageCell = ({ value }) => (
  <div style={{ cursor: 'pointer' }}>
    <img src={value} width="100" height="100" alt="thumb"></img>
  </div>
);
