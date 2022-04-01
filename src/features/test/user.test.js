import reducer, { login, logout } from '../userSlice';
import deepFreeze from 'deep-freeze'

describe('userReducer', () =>{
    test('returns state.user after login action',  async () =>{
        const state = {
            user:null
        };

        const action  = {
                username:{_id:1,u_mail:'rennygorozabel@hotmail.com'}
        };

        deepFreeze(state);
        const newState = reducer(state,login(action));

        const rootState = {user:newState};

        expect(rootState).not.toBeNull();
        expect(rootState).toEqual({
            user:{
                user:{
                    username:{_id:1,u_mail:'rennygorozabel@hotmail.com'}
                    }
                }
            }
        )

    },
    test('return state.user = null after logOut',()=>{
        const state = {
            user:{
                user:{
                    username:{_id:1,u_mail:'rennygorozabel@hotmail.com'}
                }
            }
        };

        deepFreeze(state);
        const newState = reducer(state,logout(state));
        const rootState = {user:newState};

        expect(rootState).toEqual({
            user:null
        });
    })
    )
})
