import { createSignal, createEffect } from 'solid-js'

import './Popup.css'
import { i18n } from '../translations'
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
        {i18n.availableLocales.map(locale => (
          <option value={locale}>{locale}</option>
        ))}
      </select>
    </main>
  )
}

export default Popup
