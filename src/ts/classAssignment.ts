//ページの読み込みとスクロール時に画面内の対象要素の位置に応じてclass名をつけ外しする機能(class)
export default class ClassAssignment {
	private readonly elm: HTMLCollectionOf<Element>; //対象とする要素
	private readonly toggleClassName: string; //つけ外しするclass名

	constructor(targetClass: string, toggleClass: string) {
		this.elm = document.getElementsByClassName(targetClass); //クラス名から対象要素を取得する
		this.toggleClassName = toggleClass;
	}
	//画面上に対象要素が入っている間だけtoggleClassを付与するメソッド
	private attachment(elements: HTMLCollectionOf<Element>, className: string): void {
		const windowHeight: number | undefined = window.innerHeight; //画面の高さ

		for (let i = 0; i < elements.length; i++) {
			const elmOffset: number | undefined = elements[i].getBoundingClientRect().top; //対象要素の画面内の座標
			if (windowHeight >= elmOffset) {
				elements[i].classList.add(className);
			} else {
				elements[i].classList.remove(className);
			}
		}
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