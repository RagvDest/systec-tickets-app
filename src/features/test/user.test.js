import reducer, { login, logout, logCli } from '../userSlice';
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

    });
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

        expect(newState).toEqual({
            user:null
        });
    });
    test('return state.user after login cli action',()=>{
        const state={
            user:null
        };

        const action = {
            user: {
                usuario: {
                    _id: "61e902d8996cc57b8dca918d",
                    persona_id: "61e902d8996cc57b8dca918a",
                    u_mail: "titojoses@hotmail.com",
                    u_activo: true,
                    u_usuario: "TitoGV"
                },
                rol: "Empleado",
                persona: {
                    _id: "61e902d8996cc57b8dca918a",
                    p_cedula: "1305412321",
                    p_apellidos: "Gorozabel Villavicencio",
                    p_nombres: "Tito Joses",
                    __v: 0,
                    p_tel: "0983456585"
                }
            },
            pedidos: [
              {
                _id: "624b38f89b5b8479dedde4e1",
                usuario_id: "61e902d8996cc57b8dca918d",
                ped_nro_orden: "DDV-5AC-3S4",
                ped_estado: "ABIERTO",
                ped_fc_fin: null,
                ped_fc_registro: "2022-02-01T09:37:12.168Z",
                __v: 0
              }
            ]
          }

        deepFreeze(state);
        
        expect(reducer(state,logCli(action))).toBeDefined();

        const newState = reducer(state,logCli(action))
        expect(newState).toEqual({
            user:{
                usuario: {
                    _id: "61e902d8996cc57b8dca918d",
                    persona_id: "61e902d8996cc57b8dca918a",
                    u_mail: "titojoses@hotmail.com",
                    u_activo: true,
                    u_usuario: "TitoGV"
                  },
                  rol: "Empleado",
                  persona: {
                    _id: "61e902d8996cc57b8dca918a",
                    p_cedula: "1305412321",
                    p_apellidos: "Gorozabel Villavicencio",
                    p_nombres: "Tito Joses",
                    __v: 0,
                    p_tel: "0983456585"
                  }
            }
        })
        
    });
})
