import debounce from 'lodash/debounce'

const debounceTimers = new Map()

export function scheduleQuantitySync(dispatch, syncQuantityThunk, orderId, orderItemId, data) {
    if (!debounceTimers.has(orderItemId)) {
        debounceTimers.set(
            orderItemId,
            debounce((orderId, data) => {
                dispatch(syncQuantityThunk({orderId, orderItemId, data}))
            }, 400)
        )
    }
    debounceTimers.get(orderItemId)(orderId, data)
}

export function cancelPendingSync(orderItemId) {
    debounceTimers.get(orderItemId)?.cancel();
    debounceTimers.delete(orderItemId);
}