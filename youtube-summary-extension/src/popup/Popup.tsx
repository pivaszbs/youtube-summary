import { createSignal, createEffect } from 'solid-js'

import './Popup.css'
import { availableLocales } from '../translations'
import { set } from '../contentScript/storage'

/**
 * Popup
 */
export const Popup = () => {
  return (
    <main>
      <select onChange={(e) => {
        set('locale', e.currentTarget.value)
      }}>
        {availableLocales.map(locale => (
          <option value={locale}>{locale}</option>
        ))}
      </select>
    </main>
  )
}

export default Popup
