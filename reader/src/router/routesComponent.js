//import Main from '@/components/Main'

export default {
	Main:r => require(['@/components/Main'], r),
	Classify:r => require(['@/components/Classify'], r),
	Competitive:r => require(['@/components/Competitive'], r),
	Seqence:r => require(['@/components/Seqence'], r),
	Vip:r => require(['@/components/Vip'], r),
	Search:r => require(['@/components/Search'], r),
	GetBooks:r => require(['@/components/GetBooks'], r),
	BookInfo:r => require(['@/components/BookInfo'], r),
	Chapter:r => require(['@/components/Chapter'], r),
	Book:r => require(['@/components/Book'], r),
	Login:r => require(['@/components/Login'], r),
	Mini:r => require(['@/components/Mini'], r),
	BookShelf:r => require(['@/components/BookShelf'],r)
}
