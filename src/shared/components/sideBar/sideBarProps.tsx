import Dashboard from '../../../assets/icons/dashboard';
import Home from '../../../assets/icons/home';
import Notifications from '../../../assets/icons/notifications';
import Profile from '../../../assets/icons/profile';
import Search from '../../../assets/icons/search';
import WishList from '../../../assets/icons/wishlist';
import CircleBadge from '../circleBadge';

export const getLinks = (user: { role: string }, isLogin: boolean, wishList: []) => [
	{
		to: user?.role === 'admin' ? '/admin' : '/',
		component: <Dashboard />,
		text: 'Dashboard',
		spanClassName: 'ml-3',
	},
	...(user?.role === 'admin'
		? [
				{
					to: '/admin/home',
					component: <Home color={'#6B7280'} />,
					text: 'Home Admin',
					spanClassName: 'ml-3',
				},
			]
		: []),
	{
		to: '/',
		component: <Search color={'#6B7280'} />,
		text: 'Search',
		spanClassName: 'ml-3',
	},
	...(isLogin
		? [
				{
					to: user?.role === 'admin' ? '/admin/profile' : '/profile',
					component: <Profile />,
					text: 'Profile',

					spanClassName: 'flex-1 ml-3',
				},
				{
					to: user?.role === 'admin' ? '/admin/wishlist' : '/wishlist',
					component: <WishList color={'#6B7280'} />,
					secondComponent: <CircleBadge count={wishList?.length} />,
					text: 'WishList',

					spanClassName: 'flex-1 ml-3',
				},
				{
					to: user?.role === 'admin' ? '/admin' : '/',
					component: <Notifications />,
					secondComponent: <CircleBadge count={2} />,
					text: 'Notifications',

					spanClassName: 'flex-1 ml-3',
				},
			]
		: []),
];
