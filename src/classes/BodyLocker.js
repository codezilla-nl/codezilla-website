const bodyLockClassname = 'body--locked-mobile';
const bodyEl = document.body;

export default class BodyLocker {
    lockMobile(){
        bodyEl.classList.add(bodyLockClassname);
    }
    unlockMobile(){
        bodyEl.classList.remove(bodyLockClassname);
    }
}
