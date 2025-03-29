/**お問い合わせフォームを制御するclass */
export default class Form {
	/**フォームの各入力elementを取得してイベントリスナーを登録 */
	constructor(
		private button: HTMLButtonElement,
		private buttonParts: HTMLCollectionOf<HTMLSpanElement | HTMLIFrameElement>,
		private name: HTMLInputElement,
		private mail: HTMLInputElement,
		private text: HTMLTextAreaElement,
		private confirm: HTMLInputElement
	) {
		this.eventBindInputs([this.name, this.mail, this.text, this.confirm]);
		this.button?.addEventListener('click', this.eventBindButton.bind(this));
	}
	/**引数に指定したinput項目にイベントリスナーを一括設定する */
	private eventBindInputs(elementList: (HTMLInputElement | HTMLTextAreaElement)[]) {
		elementList.forEach((element) => {
			element?.addEventListener('keyup', () => {
				this.changeButtonActive(element);
			});
		});
	}

	/** 送信ボタンの活性・非活性を切り替えて、引数（条件式）の結果を逆転した戻り値を返す */
	private chengeDisabledButton = (boolean: boolean): boolean => {
		if (boolean) {
			this.button.disabled = boolean;
			return false;
		} else {
			this.button.disabled = boolean;
			return true;
		}
	};
	/** 送信ボタンとその子孫要素の可視性を切り替える */
	private chengeVisibilityButton = (state: 'hidden' | 'visible') => {
		this.button.style.visibility = state;
		for (let i = 0; i < this.buttonParts.length; i++) {
			const element = this.buttonParts[i];
			element.style.visibility = state;
		}
	};
	/** 引数で指定したInputが空でなかったらbuttonを活性・可視化させる*/
	private changeButtonActive = (element: HTMLInputElement | HTMLTextAreaElement) => {
		if (element.value !== '') {
			this.chengeDisabledButton(false);
			this.chengeVisibilityButton('visible');
		}
	};
	/**各入力項目をバリデーションして,通過したらバリデーション防止策としてbuttonを不可視にする*/
	private eventBindButton() {
		/** メールアドレスの正規表現 */
		const regex = /^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/;
		if (!this.chengeDisabledButton(this.name.value === '' || !this.name)) return false;
		if (
			!this.chengeDisabledButton(this.mail.value === '' || !this.mail || !regex.test(this.mail.value))
		) {
			return false;
		}
		if (!this.chengeDisabledButton(this.text.value === '' || !this.text)) return false;
		if (!this.chengeDisabledButton(this.confirm.value !== '確認しました')) return false;

		this.chengeVisibilityButton('hidden');
	}

	/** Input項目を空文字にする*/
	clearInput() {
		this.name.value = '';
		this.mail.value = '';
		this.text.value = '';
		this.confirm.value = '';
	}
}
