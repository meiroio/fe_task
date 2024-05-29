import { Typography } from '@mui/material';

export interface ViewHeadingProps {
  title?: string;
  description?: string;
}

const ViewHeading = ({ title, description }: ViewHeadingProps) => {
  return (
    <div>
      {title && <Typography variant="h2">{title}</Typography>}
      {description && <Typography>{description}</Typography>}
    </div>
  );
};

export default ViewHeading;
