import RoutesComponent from './routesComponent.js'

export default [
	{
		path: '/',
		name: 'Main',
	component: RoutesComponent.Main,
		children: [{
				path: '/main/classify',
				name: 'Classify',
				component: RoutesComponent.Classify
			},
			{
				path: '/main/seqence',
				name: 'Seqence',
				component: RoutesComponent.Seqence
			},
			{
				path: '/main/competitive',
				name: 'Competitive',
				component: RoutesComponent.Competitive
			},
			{
				path: '/main/vip',
				name: 'Vip',
				component: RoutesComponent.Vip
			}
		]
	},
	{
		path: '/search',
		name: 'Search',
		component: RoutesComponent.Search
	},
	{
		path: '/getbooks',
		name: 'GetBooks',
		component: RoutesComponent.GetBooks
	},
	{
		path:'/bookinfo',
		name:'BookInfo',
		component:RoutesComponent.BookInfo
	},
	{
		path:'/chapter',
		name:'Chapter',
		component:RoutesComponent.Chapter
	},
	{
		path:'/book',
		name:'Book',
		component:RoutesComponent.Book
	},
	{
		path:'/login',
		name:'Login',
		component:RoutesComponent.Login
	},
	{
		path:'/mini',
		name:'Mini',
		component:RoutesComponent.Mini
	},
	{
		path:'/bookshelf',
		name:'BookShelf',
		component:RoutesComponent.BookShelf
	}
]