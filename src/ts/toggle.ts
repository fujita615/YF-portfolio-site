
//指定したclass名の要素が画面内に在る時だけ別のclassを付与する関数
function toggleClass(Elm: JQuery<HTMLElement>, className: string): void {
	const scroll: number | undefined = $(window).scrollTop();
	const windowHeight: number | undefined = $(window).height();

	Elm.each((): void => {
		const elemPos: number | undefined = Elm.offset()?.top;
		if (scroll && elemPos && windowHeight && scroll >= elemPos - windowHeight) {
			Elm.addClass(className);
		} else {
			Elm.removeClass(className);
		}
	});
}

//ページスクロール時と読み込み時にtoggleClass関数作動する関数
function anime(Elm: JQuery<HTMLElement>, className: string): void {
	window.addEventListener('scroll', (): void => {
		toggleClass(Elm, className);
	});
	window.addEventListener('load', (): void => {
		toggleClass(Elm, className);
	});
}
anime($('.u-fade--up'), 'js-fade--up');
anime($('.u-line'), 'js-line--draw');
anime($('.u-flip'), 'js-flip--forward-rotation');
anime($('.u-bg-right'), 'js-bg-right--extend');
anime($('.u-bg-left'), 'js-bg-left--extend');
anime($('.u-focus'), 'js-focus--match');
