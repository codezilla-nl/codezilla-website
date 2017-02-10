const bodyLockMobileClassname = 'body--locked-mobile';
const bodyEl = document.body;

export default class BodyLocker {
    lockMobile(){
        bodyEl.classList.add(bodyLockMobileClassname);
    }
    unlockMobile(){
        bodyEl.classList.remove(bodyLockMobileClassname);
    }
}
