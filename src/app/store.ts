import { Birthday } from "./model/birthday";
import { ADD_BIRTHDAY, LOAD_BIRTHDAY } from './actions';
import { tassign } from 'tassign';

export interface IAppState {
    birthdays: Birthday[],
}

export const INITIAL_STATE: IAppState = {
    birthdays: []
}

function addBirthday(state, action) {
    return tassign(state, {
        birthdays: state.birthdays.concat(action.birthday)
    })
}

function loadBirthdays(state, action) {
    return tassign(state, {
        birthdays: action.birthdays
    })
}

export function rootReducer(state: IAppState, action): IAppState {
    switch (action.type) {
        case ADD_BIRTHDAY: return addBirthday(state, action);
        case LOAD_BIRTHDAY: return loadBirthdays(state, action);
    }
    return state;
}