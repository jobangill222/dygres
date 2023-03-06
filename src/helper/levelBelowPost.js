// export const verificationLevel = async (isEmailVerify, isPhotoVerify) => {
//     return isEmailVerify === 1 && isPhotoVerify === 0 ? '1'
//         : isEmailVerify === 1 && isPhotoVerify === 3 ? '1'
//             : isEmailVerify === 1 && isPhotoVerify === 2 ? '1'
//                 : isEmailVerify === 1 && isPhotoVerify === 1 ? '2'
//                     : isEmailVerify === 0 && isPhotoVerify === 0 ? '0' : 0
// }
export const levelBelowPost = async (isPostByOfficial, level, isOfficial) => {
    return isPostByOfficial === 1 ? 4
        // : isOfficial === 1 ? 4
        : level
}
