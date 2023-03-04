// Source - https://gist.github.com/rmorse/426ffcc579922a82749934826fa9f743

import { useContext, useEffect, useCallback } from "react";
import { UNSAFE_NavigationContext as NavigationContext } from "react-router-dom";
import { DContext } from "../Context/DContext";


export function useBlocker(blocker, when = true) {

    const { navigator } = useContext(NavigationContext);

    useEffect(() => {
        if (!when) return;

        const unblock = navigator.block((tx) => {
            const autoUnblockingTx = {
                ...tx,
                retry() {
                    unblock();
                    tx.retry();
                }
            };

            blocker(autoUnblockingTx);
        });

        return unblock;
    }, [navigator, blocker, when]);
}

export default function usePrompt(message, when = true,) {

    const { setIsShowDataSaveConfirmationPopup, setsaveTxStateForRetry } = useContext(DContext);

    const blocker = useCallback(
        (tx) => {
            // if (window.confirm(message)) tx.retry();
            setIsShowDataSaveConfirmationPopup(true)
            setsaveTxStateForRetry(tx);
        },
        [message]
    );

    useBlocker(blocker, when);
}
