/**
 *
 * Created by xiaosong 2017/09/15
 * ***/

export default () => ({
    path : 'report/:id',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            const Report = require('./Report').default;
            cb(null, Report)
        }, 'report')
    }
})