import { styled, Box, Container, Typography, Stack, BoxProps } from '@mui/material';
import { PROJECT } from '../../config';
import { CONTAINER_MAX_WIDTH_DEFAULT } from '../../constants';

const Wrapper = styled(Box)(({ theme: { spacing } }) => ({
  padding: spacing(2),
}));

interface FooterProps {
  wrapperProps?: Partial<Omit<BoxProps, 'component'>>;
}

const Footer = ({ wrapperProps }: FooterProps) => {
  return (
    <Wrapper component="footer" {...wrapperProps}>
      <Container maxWidth={CONTAINER_MAX_WIDTH_DEFAULT}>
        <Stack>
          <Typography variant="caption" sx={{ textAlign: 'center' }}>
            {PROJECT.meta.name} - {PROJECT.meta.description} ({PROJECT.meta.year})
          </Typography>
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default Footer;
