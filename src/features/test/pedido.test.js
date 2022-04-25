import deepFreeze from 'deep-freeze'
import reducer, { getPedidos } from '../pedidoSlice';


describe('pedidoReducer', () =>{
    test('returns state.pedidos',  async () =>{
        const state = {
            pedidos:[],
            pedidoSelect:null
        };
        const action=[
                {
                  _id: "624b38f89b5b8479dedde4e1",
                  usuario_id: "61e902d8996cc57b8dca918d",
                  ped_nro_orden: "DDV-5AC-3S4",
                  ped_estado: "ABIERTO",
                  ped_fc_fin: null,
                  ped_fc_registro: "2022-02-01T09:37:12.168Z",
                  __v: 0
                }
            ];

        expect(reducer(state,getPedidos(action))).toBeDefined();

        const newState = reducer(state,getPedidos(action));

        expect(newState).toEqual(
            {
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
                ],
                pedidoSelect:null
            }
        )
    });
})