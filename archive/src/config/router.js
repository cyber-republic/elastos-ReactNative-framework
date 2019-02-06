import HomeContainer from 'app/module/Home/HomeContainer';
import InstallAppPage from 'app/module/InstallApp/Container';

export default {

	home : {
		path : 'home',
		screen : HomeContainer,
		statusBar : {
			show : true
		},
		navigationOptions : {
			gesturesEnabled : false
		}
	},

	install_app : {
		path : 'install_app',
		screen : InstallAppPage
	},


	init : 'home'
};