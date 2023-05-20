import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { ROUTES } from '../constants';

const navItems = [
  {
    item: 'Home',
    path: ROUTES.HOME,
  },
  {
    item: 'Dice',
    path: ROUTES.DICEROLLER,
  },
  {
    item: 'Chess',
    path: ROUTES.CHESS,
  },
  {
    item: 'Tic Tac Toe',
    path: ROUTES.TICTACTOE,
  }
];

export default function DrawerAppBar() {
  return (
    <Box sx={ { display: 'flex', marginTop: '75px' } }>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={ { flexGrow: 1, display: { xs: 'none', sm: 'block' } } }
          >
            Jerrol Brooks
          </Typography>
          <Box sx={ { display: { xs: 'none', sm: 'block' } } }>
            {navItems.map(({ item, path }) => (
              <NavLink key={ item } to={ path }>
                <Button sx={ { color: '#fff' } }>
                  {item}
                </Button>
              </NavLink>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
