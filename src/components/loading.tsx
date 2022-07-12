import { Typography } from '@mui/material';

interface Props {
  name: string;
}

const Loading = ({ name }: Props) => (
  <Typography variant="body1" gutterBottom>
    Loading...
    <br />
    {name && ` ${name}`}
  </Typography>
);

export default Loading;
