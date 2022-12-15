import React from 'react'

/**
 * ClearHistory is a component that provides a button that, when clicked,
 * clears the history in localStorage and the parent component's state.
 *
 * @param {Function} setItems - A function that can be used to update the
 *   parent component's state.
 */

export function ClearHistory({ setItems }) {
    const clearLocalStorage = function () {
        // Clear the items in localStorage and the parent component's state
        localStorage.setItem('items', '')
        setItems([])
    }
    return (
        <div className='clearHistory'>
            <button onClick={clearLocalStorage}>clear History</button>
        </div>
    )
}
