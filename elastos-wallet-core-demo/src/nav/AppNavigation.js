import { createStackNavigator , createAppContainer } from 'react-navigation';
import Start from '../components/start/Start';
import Balance from '../components/balance/Balance';
import Create from '../components/create/Create';
import Import from '../components/import/Import';

const AppNav = createStackNavigator({
      Start: {
        screen: Start,
        headerMode: 'none',
        header: null,
      },
      Balance: {
        screen: Balance,
        headerMode: 'none',
        header: null,
      },
      Create: {
        screen: Create,
        headerMode: 'none',
        header: null,
      },
      Import: {
        screen: Import,
        headerMode: 'none',
        header: null,
      }
    },
    {
      initialRouteName: 'Start',
    }
  );

  const AppContainer = createAppContainer(AppNav);
  export default AppContainer;
