import { useState, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { Box, Toolbar, AppBar, IconButton, Typography, Menu, Container, Button, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { PROJECT } from '../../config';
import { CONTAINER_MAX_WIDTH_DEFAULT, HEADER_DESKTOP_HEIGHT, MAIN_MENU } from '../../constants';

const Header = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  const openNavMenuHandler = (event: MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);

  const closeNavMenuHandler = () => setAnchorElNav(null);

  return (
    <AppBar position="fixed" sx={{ height: HEADER_DESKTOP_HEIGHT }}>
      <Container maxWidth={CONTAINER_MAX_WIDTH_DEFAULT}>
        <Toolbar disableGutters>
          <Typography
            variant="h1"
            noWrap
            component={Link}
            to="/"
            sx={{
              fontSize: '1.5rem',
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {PROJECT.meta.name}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="HeaderAppBar"
              aria-haspopup="true"
              onClick={openNavMenuHandler}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="HeaderAppBar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={closeNavMenuHandler}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {MAIN_MENU.map((item) => (
                <MenuItem key={item.key} onClick={closeNavMenuHandler}>
                  <Typography component={Link} to={item.path} sx={{ color: 'inherit', textDecoration: 'none' }}>
                    {item.label}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            {PROJECT.meta.name}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }} />
          <Box sx={{ flexGrow: 0, display: { xs: 'none', md: 'flex' } }}>
            {MAIN_MENU.map((item) => (
              <Button key={item.key} component={Link} to={item.path}>
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;
