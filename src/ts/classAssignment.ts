//ページの読み込みとスクロール時に画面内の対象要素の位置に応じてclass名をつけ外しする
class classAssignment {
	private readonly elm: JQuery<HTMLElement>; //対象とする要素
	private readonly toggleClassName: string; //つけ外しするclass名

	constructor(targetClass: string, toggleClass: string) {
		this.elm = $(`.${targetClass}`); //クラス名から対象要素を取得する
		this.toggleClassName = toggleClass;
	}
	//画面上に対象要素が入っている間だけtoggleClassを付与するメソッド
	private attachment(Elm: JQuery<HTMLElement>, className: string): void {
		const scroll: number | undefined = $(window).scrollTop(); //ページ内のスクロール量
		const windowHeight: number | undefined = $(window).height(); //画面の高さ
		const ElmOffset: JQuery.Coordinates | undefined = Elm.offset(); //対象要素の画面内の座標
		Elm.each((): void => {
			if (ElmOffset && scroll && windowHeight) {
				const elemPos: number = ElmOffset.top; //対象要素の左上のy座標
				if (scroll >= elemPos - windowHeight) {
					Elm.addClass(className);
				} else {
					Elm.removeClass(className);
				}
			}
		});
	}
	//ページスクロール時と読み込み時に attachmentメソッドを発火
	public whenScroll(): void {
		window.addEventListener('scroll', (): void => {
			this.attachment(this.elm, this.toggleClassName);
		});
		window.addEventListener('load', (): void => {
			this.attachment(this.elm, this.toggleClassName);
		});
	}
}

export default classAssignment;
