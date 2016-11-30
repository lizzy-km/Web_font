import {takeEvery, delay} from 'redux-saga'
import {put, race, fork, cancel} from 'redux-saga/effects'
import FontFaceObserver from 'fontfaceobserver'
import {SelectFont} from '../commands'
import createAction, {
  HomeLeaved,
  FontChanged,
  CurtainLoading
} from '../actions'
import {enterCurtain, leaveCurtain} from './curtain'
import data from '../data.yml'
import {getFontItem} from '../utils'

export default function* (document) {
  yield takeEvery(SelectFont, loadFont, document)
}

function* loadFont(document, {payload: {groupIndex, itemIndex}}) {
  const {url, family} = getFontItem(data, groupIndex, itemIndex)
  const observer = new FontFaceObserver(family)
  if (url && !isFontLoaded(document, url)) {
    const link = document.createElement('link')
    link.rel = 'stylesheet'
    link.href = url
    document.head.appendChild(link)
  }
  yield enterCurtain()
  yield fork(showLoadingIndicator)
  try {
    yield observer.load('한글', 10000) // FIXME
  } catch(e) {}
  yield put(createAction(FontChanged, {groupIndex, itemIndex}))
  yield put(createAction(HomeLeaved))
  yield leaveCurtain()
}

function* showLoadingIndicator() {
  yield delay(500)
  yield put(createAction(CurtainLoading))
}

function isFontLoaded(document, url) {
  return !!document.querySelector(`link[href="${url}"]`)
}