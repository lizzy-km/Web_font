export default function createAction(type, payload) {
  return {type, payload, isAction: true}
}
export const FontChanged = 'FontChanged'
export const MenuOpened = 'MenuOpened'
export const MenuClosed = 'MenuClosed'
export const HomeArrived = 'HomeArrived'
export const HomeLeaved = 'HomeLeaved'