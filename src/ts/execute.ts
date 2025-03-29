import ClassAssignment from './classAssignment';
import Form from './form';


//cssのアニメーションclassごとにClassAssigmentクラスをインスタンス化する
const FadeUp: ClassAssignment = new ClassAssignment('u-fade--up', 'js-fade--up');
const Line: ClassAssignment = new ClassAssignment('u-line', 'js-line--draw');
const Flip: ClassAssignment = new ClassAssignment('u-flip', 'js-flip--forward-rotation');
const BgRight: ClassAssignment = new ClassAssignment('u-bg-right', 'js-bg-right--extend');
const BgLeft: ClassAssignment = new ClassAssignment('u-bg-left', 'js-bg-left--extend');
const Foucus: ClassAssignment = new ClassAssignment('u-focus', 'js-focus--match');

//各インスタンスのwhenScrollメソッドを開始
FadeUp.whenScroll();
Line.whenScroll();
Flip.whenScroll();
BgRight.whenScroll();
BgLeft.whenScroll();
Foucus.whenScroll();


//お問い合わせフォームの各要素を取得してFormクラスをインスタンス化する
const button = document.getElementById('js-form__button') as HTMLButtonElement;
const buttonParts = button?.getElementsByClassName('js-form__button') as HTMLCollectionOf<
	HTMLSpanElement | HTMLIFrameElement
>;
const nameInput = document.getElementById('js-form__name') as HTMLInputElement;
const emailInput = document.getElementById('js-form__email') as HTMLInputElement;
const textInput = document.getElementById('js-form__text') as HTMLTextAreaElement;
const confirmInput = document.getElementById('js-form__confirm') as HTMLInputElement;

const contactForm = new Form(button, buttonParts, nameInput, emailInput, textInput, confirmInput);

//ページを離脱した時はフォームの入力を空欄にする
window.addEventListener('beforeunload', () => {
	contactForm.clearInput();
});
