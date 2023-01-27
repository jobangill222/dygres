export const verificationLevel = async (isEmailVerify, isPhotoVerify) => {
    return isEmailVerify === 1 && isPhotoVerify === 0 ? '1' : isPhotoVerify === 1 ? "2" : "0"
}
