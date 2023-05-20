import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ROUTES } from './constants';
import { Header } from './components';
import { Chess, Dice, TicTacToe } from './games';

function App() {
  const chess = () => <Chess />;
  const diceRoller = () => <Dice />;
  const ticTacToe = () => <TicTacToe />;
  const redirectInvalidPathnameToHome = () => {
    if (
      !Object.values(ROUTES).includes(window.location.pathname)
      && window.location.pathname !== '/'
    ) {
      window.location.href = '/';
    }
  };

  redirectInvalidPathnameToHome();

  return (
    <Router>
      <Header />
      <Route path={ ROUTES.CHESS } component={ chess } />
      <Route path={ ROUTES.DICEROLLER } component={ diceRoller } />
      <Route path={ ROUTES.TICTACTOE } component={ ticTacToe } />
    </Router>
  );
}

export default App;

