import { styled, Box, Container, BoxProps, ContainerProps } from '@mui/material';
import { WithChildren } from '../../types';
import { CONTAINER_MAX_WIDTH_DEFAULT } from '../../constants';
import { ViewHeading, ViewHeadingProps } from '../ViewHeading';

const Wrapper = styled(Box, {
  shouldForwardProp: (propName) => propName !== 'isCentered',
})<{ readonly isCentered?: boolean }>(({ isCentered }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: isCentered ? 'center' : 'start',
  flex: 1,
}));

interface ViewLayoutProps extends WithChildren {
  maxWidth?: ContainerProps['maxWidth'];
  wrapperProps?: Partial<BoxProps>;
  containerProps?: Partial<Omit<ContainerProps, 'maxWidth'>>;
  heading?: ViewHeadingProps;
  isCentered?: boolean;
}

const ViewLayout = ({
  maxWidth = CONTAINER_MAX_WIDTH_DEFAULT,
  children,
  wrapperProps,
  containerProps,
  heading,
  isCentered,
}: ViewLayoutProps) => {
  return (
    <Wrapper {...wrapperProps} isCentered={isCentered}>
      <Container maxWidth={maxWidth} {...containerProps}>
        {heading && <ViewHeading {...heading} />}
        <div>{children}</div>
      </Container>
    </Wrapper>
  );
};

export default ViewLayout;
