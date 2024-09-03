function fadeAnime(): void {
	//要素が上がって出現するclassを対象要素が画面内に入ったら付与
	$('.u-fade--up').each(function (this: HTMLElement): void {
		const elemPos: number = $(this).offset().top;
		const scroll: number = $(window).scrollTop();
		const windowHeight: number = $(window).height();
		if (scroll >= elemPos - windowHeight) {
			$(this).addClass('js-fade--up');
		} else {
			$(this).removeClass('js-fade--up');
		}
	});

	//sectionを区切る上ラインが左から伸びるclassを対象要素が画面内に入ったら付与
	$('.u-line').each(function (this: HTMLElement): void {
		const elemPos: number = $(this).offset().top;
		const scroll: number = $(window).scrollTop();
		const windowHeight: number = $(window).height();
		if (scroll >= elemPos - windowHeight) {
			$(this).addClass('js-line--draw');
		} else {
			$(this).removeClass('js-line--draw');
		}
	});

	//要素が前回転して現れるclassを対象要素が画面内に入ったら付与
	$('.u-flip').each(function (this: HTMLElement): void {
		const elemPos: number = $(this).offset().top;
		const scroll: number = $(window).scrollTop();
		const windowHeight: number = $(window).height();
		if (scroll >= elemPos - windowHeight) {
			$(this).addClass('js-flip--forward-rotation');
		} else {
			$(this).removeClass('js-flip--forward-rotation');
		}
	});

	//背景色が右から伸びて現れるclassを対象要素が画面内に入ったら付与
	$('.u-bg-right').each(function (this: HTMLElement): void {
		const elemPos: number = $(this).offset().top;
		const scroll: number = $(window).scrollTop();
		const windowHeight: number = $(window).height();
		if (scroll >= elemPos - windowHeight) {
			$(this).addClass('js-bg-right--extend');
		} else {
			$(this).removeClass('js-bg-right--extend');
		}
	});

	//背景色が左から伸びて現れるclassを対象要素が画面内に入ったら付与
	$('.u-bg-left').each(function (this: HTMLElement): void {
		const elemPos: number = $(this).offset().top;
		const scroll: number = $(window).scrollTop();
		const windowHeight: number = $(window).height();
		if (scroll >= elemPos - windowHeight) {
			$(this).addClass('js-bg-left--extend');
		} else {
			$(this).removeClass('js-bg-left--extend');
		}
	});

	//要素にゆっくりピントが合うclassを対象要素が画面内に入ったら付与
	$('.u-focus').each(function (this: HTMLElement): void {
		const elemPos: number = $(this).offset().top;
		const scroll: number = $(window).scrollTop();
		const windowHeight: number = $(window).height();
		if (scroll >= elemPos - windowHeight) {
			$(this).addClass('js-focus--match');
		} else {
			$(this).removeClass('js-focus--match');
		}
	});
}

//スクロール時に関数作動
$(window).on('scroll', function (): void {
	fadeAnime();
});
//ページを読み込み時に関数作動
$(window).on('load', function (): void {
	fadeAnime();
});
