/**
 * EventHub for bhStepFlow,
 * instead of '$broadcast/$dispatch'
 */

const _create = () => { // need create instance for each component
    return new Vue();
};

export default {
    instance: _create
};
