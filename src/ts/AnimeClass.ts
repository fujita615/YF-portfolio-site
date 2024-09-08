import classAssignment from './classAssignment';

//cssのアニメーションclassごとにclassAssigmentクラスをインスタンス化する
const FadeUp: classAssignment = new classAssignment('u-fade--up', 'js-fade--up');
const Line: classAssignment = new classAssignment('u-line', 'js-line--draw');
const Flip: classAssignment = new classAssignment('u-flip', 'js-flip--forward-rotation');
const BgRight: classAssignment = new classAssignment('u-bg-right', 'js-bg-right--extend');
const BgLeft: classAssignment = new classAssignment('u-bg-left', 'js-bg-left--extend');
const Foucus: classAssignment = new classAssignment('u-focus', 'js-focus--match');

//各インスタンスのwhenScrollメソッドを開始
FadeUp.whenScroll();
Line.whenScroll();
Flip.whenScroll();
BgRight.whenScroll();
BgLeft.whenScroll();
Foucus.whenScroll();
